from utils.fileUtils import get_model_full_path, read_clean_fill_invalid_data, get_data_full_path, \
    create_patient_csv_file, append_linear_data_to_patient_csv_file, create_directory_if_not_exist, \
    append_data_patient_csv_file, delete_oldest_data, get_new_data_full_path, append_data_patient_csv_file_from_zero
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential, load_model
from keras.layers import Dense, LSTM, Dropout, GRU, Bidirectional
import os
import numpy as np
import datetime
import pandas as pd
import torch
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler

def train_network_model(trainData, savingFile):

    # Scaling the training set
    # print(trainData)
    sc = MinMaxScaler(feature_range=(0, 1))
    training_set_scaled = sc.fit_transform(trainData)

    # Since LSTMs store long term memory state, we create a data structure with 60 timesteps and 1 output
    # So for each element of training set, we have 60 previous training set elements
    X_train = []
    y_train = []

    number_of_time_steps = 60

    for i in range(number_of_time_steps, len(training_set_scaled)):
        X_train.append(training_set_scaled[i - number_of_time_steps:i, 0])
        y_train.append(training_set_scaled[i, 0])
    X_train, y_train = np.array(X_train), np.array(y_train)

    # Reshaping X_train for efficient modelling
    X_train = np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))
    # print(X_train)

    # The LSTM architecture
    regressor = Sequential()
    # First LSTM layer with Dropout regularisation
    regressor.add(Bidirectional(LSTM(units=50, return_sequences=True, input_shape=(X_train.shape[1], 1))))
    regressor.add(Dropout(0.2))
    # Second LSTM layer
    regressor.add(Bidirectional(LSTM(units=50, return_sequences=True)))
    regressor.add(Dropout(0.2))
    # Third LSTM layer
    regressor.add(Bidirectional(LSTM(units=50, return_sequences=True)))
    regressor.add(Dropout(0.2))
    # Fourth LSTM layer
    regressor.add(Bidirectional(LSTM(units=50)))
    regressor.add(Dropout(0.2))
    # The output layer
    regressor.add(Dense(units=1))

    # Compiling the RNN
    regressor.compile(optimizer='rmsprop', loss='mean_squared_error')
    # Fitting to the training set
    regressor.fit(X_train, y_train, epochs=40, batch_size=32)

    regressor.save(savingFile,overwrite=True,include_optimizer=True)

    return regressor,sc,X_train,y_train


def estimate_using_model(patientId):

    filePath = get_new_data_full_path(patientId)
    modelFilePath = get_model_full_path(patientId)
    dataset = read_clean_fill_invalid_data(filePath)
    dt = dataset['timestamp'].values
    times = [datetime.datetime.fromtimestamp(t) for t in dt]

    trainData = dataset['glicemia'].values
    trainData = trainData.reshape(-1, 1)

    sc = MinMaxScaler(feature_range=(0, 1))
    training_set_scaled = sc.fit_transform(trainData)

    trainX = []
    trainY = []
    n_future = 24
    n_past = 60
    # v = len(training_set_scaled) - n_future + 1
    # print("npast ", n_past, " la ", v)
    for i in range(n_past, len(training_set_scaled) - n_future + 1):
        # print("X de ", i - n_past, " la ", i, " si Y ", i + n_future - 1, " la ", i + n_future, "\n")
        trainX.append(training_set_scaled[i - n_past:i, 0:training_set_scaled.shape[1]])
        trainY.append(training_set_scaled[i + n_future - 1:i + n_future, 0])
    trainX, trainY = np.array(trainX), np.array(trainY)

    regressor = load_model(modelFilePath)

    n_past = 144
    n_days_for_prediction = 288

    prediction = regressor.predict(trainX[-n_days_for_prediction:])
    trainTimestamp = dataset['timestamp'].values
    datetime_array = [datetime.datetime.fromtimestamp(timestamp) for timestamp in trainTimestamp]
    predict_period_dates = pd.date_range(list(datetime_array)[len(datetime_array)-1], periods=n_days_for_prediction,freq='5T').tolist()
    prediction_copies = np.repeat(prediction, dataset.shape[1], axis=-1)

    y_pred_future = prediction_copies[:, 0]
    y_pred_future = sc.inverse_transform(prediction_copies)[:, 0]

    # Convert timestamp to date
    forecast_dates = []
    for time_i in predict_period_dates:
        forecast_dates.append(time_i)

    df_forecast = pd.DataFrame(
        {'timestamp': pd.to_datetime(forecast_dates).astype('int64') // 10 ** 9,
         # 'Date': np.array(forecast_dates),
         'glicemia': y_pred_future})

    original = dataset[['timestamp', 'glicemia']]

    # org = dataset['timestamp'].values
    # original['Date'] = [datetime.datetime.fromtimestamp(t) for t in org]

    newDataset = pd.concat([original, df_forecast], ignore_index=True)

    patientNewDataFile = get_new_data_full_path(patientId)
    create_patient_csv_file(patientNewDataFile)
    # append_data_patient_csv_file(patientNewDataFile,newDataset)
    append_data_patient_csv_file_from_zero(patientNewDataFile, newDataset)
    print(newDataset[-3:])
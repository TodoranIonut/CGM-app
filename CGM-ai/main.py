from fastapi import FastAPI
from dao.NewMeasureDAO import NewMeasureDAO
from utils.fileUtils import get_model_full_path, read_clean_fill_invalid_data, get_data_full_path, \
    create_patient_csv_file, append_linear_data_to_patient_csv_file, create_directory_if_not_exist, \
    delete_oldest_data, get_patient_new_data_file_name, get_new_data_full_path, copy_file, \
    append_data_one_row_patient_csv_file, is_path_valid
from utils.modelDataUtils import splitData
from service.LSTMService import train_network_model, estimate_using_model
from service.patientGlucoseService import add_one_new_glucose_measure_to_file_data, \
    delete_old_measurements_and_keep_certain_size, train_mode_with_patient_real_data, \
    train_model_with_patient_predicted_data, estimate_glucose_levels, estimate_glucose_level_until_specific_data

from keras.models import Sequential, load_model
from keras.layers import Dense, LSTM, Dropout, GRU, Bidirectional
import os
import numpy as np
import datetime
import pandas as pd
import torch
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler

app = FastAPI()


@app.post("/api/newMeasure")
def add_new_measure_api(newMeasure: NewMeasureDAO):
    return add_one_new_glucose_measure_to_file_data(newMeasure)


# uvicorn main:app --reload
# uvicorn main:app --reload

@app.delete("/api/clean/{pacientId}")
def delete_old_measurements_api(patientId: str):
    return delete_old_measurements_and_keep_certain_size(patientId, 1000)


@app.post("/api/train/{patientId}")
def start_train_patient_mode_api(patientId: str):
    return train_mode_with_patient_real_data(patientId)


@app.post("/api/retrain/{patientId}")
def start_train_patient_model_api(patientId: str):
    return train_model_with_patient_predicted_data(patientId)


@app.get("/api/estimate/{patientId}")
def estimate_glicemia_api(patientId: str):
    estimate_glucose_levels(patientId)
    return patientId


@app.get("/api/computeDiagnostic/{patientId}/{untilTimestamp}")
def estimate_high_glicemia_api(patientId: str, untilTimestamp: int):
    # untilDateTime = datetime.datetime(2023, 6, 20, 15, 45, 15)
    # untilTimestamp = int(untilTimestamp)
    # return estimate_glucose_level_until_specific_data(patientId, untilTimestamp, False)
    return estimate_glucose_level_until_specific_data(patientId, untilTimestamp, True, 600)
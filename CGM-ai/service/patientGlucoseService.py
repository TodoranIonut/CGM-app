from fastapi import FastAPI
from dao.NewMeasureDAO import NewMeasureDAO
from utils.fileUtils import get_model_full_path, read_clean_fill_invalid_data, get_data_full_path, \
    create_patient_csv_file, append_linear_data_to_patient_csv_file, create_directory_if_not_exist, \
    delete_oldest_data, get_patient_new_data_file_name, get_new_data_full_path, copy_file, \
    append_data_one_row_patient_csv_file, is_path_valid
from utils.modelDataUtils import splitData
from service.LSTMService import train_network_model, estimate_using_model
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


def add_one_new_glucose_measure_to_file_data(newMeasure: NewMeasureDAO):
    pcientIdString = str(newMeasure.patientId)

    pacientDirectoryName = "data\pacients\case_id_" + pcientIdString
    fileName = "case_id_" + pcientIdString + "_data.csv"

    crtDir = os.getcwd()
    directoryPath = os.path.join(crtDir, pacientDirectoryName)

    create_directory_if_not_exist(directoryPath)

    filePath = os.path.join(directoryPath, fileName)
    create_patient_csv_file(filePath)

    fileData = [newMeasure.timestamp, newMeasure.glucoseMgPerDl]

    append_data_one_row_patient_csv_file(filePath, fileData)
    return fileData


def delete_old_measurements_and_keep_certain_size(pacientId: str, sizeToKeep: int):

    pacientDirectoryName = "data\pacients\case_id_" + pacientId
    fileName = "case_id_" + pacientId + "_data.csv"

    crtDir = os.getcwd()
    directoryPath = os.path.join(crtDir, pacientDirectoryName)
    filePath = os.path.join(directoryPath, fileName)

    delete_oldest_data(filePath, sizeToKeep)

    returnedMessage = "File " + fileName + " size is " + str(sizeToKeep)
    return returnedMessage


def train_mode_with_patient_real_data(patientId: str):
    filePath = get_data_full_path(patientId)

    saveModelFilePath = get_model_full_path(patientId)
    dataset = read_clean_fill_invalid_data(filePath)

    newDataSetFile = get_new_data_full_path(patientId)
    copy_file(filePath, newDataSetFile)

    dt = dataset['timestamp'].values
    times = [datetime.datetime.fromtimestamp(t) for t in dt]

    # trainInputs, testInputs = splitData(dataset)
    print("total=", len(dataset))
    trainData = dataset['glicemia'].values
    trainData = trainData.reshape(-1, 1)

    train_network_model(trainData, saveModelFilePath)
    return times


def train_model_with_patient_predicted_data(patientId: str):
    filePath = get_new_data_full_path(patientId)

    if not is_path_valid(filePath):
        copy_file(get_data_full_path(patientId), filePath)

    saveModelFilePath = get_model_full_path(patientId)
    dataset = read_clean_fill_invalid_data(filePath)

    dt = dataset['timestamp'].values
    times = [datetime.datetime.fromtimestamp(t) for t in dt]

    # trainInputs, testInputs = splitData(dataset)
    print("total=", len(dataset))
    trainData = dataset['glicemia'].values
    trainData = trainData.reshape(-1, 1)

    train_network_model(trainData, saveModelFilePath)
    return times


def estimate_glucose_levels(patientId: str):
    estimate_using_model(patientId)
    return patientId

#, withDelete: bool, sizeToKeep: int):
def estimate_glucose_level_until_specific_data(patientId: str, untilDateTime: int, withDelete: bool, sizeToKeep=1000):
    filePath = get_new_data_full_path(patientId)

    if not is_path_valid(filePath):
        copy_file(get_data_full_path(patientId), filePath)

    saveModelFilePath = get_model_full_path(patientId)
    dataset = read_clean_fill_invalid_data(filePath)
    lastDateTime = dataset['timestamp'].values[-1]
    # lastDateString = datetime.datetime.fromtimestamp(int(lastDateTime))

    glicemiaStatus = "HEALTHY"

    while untilDateTime > lastDateTime:
        print(datetime.datetime.fromtimestamp(lastDateTime))
        # dt = dataset['timestamp'].values
        # times = [datetime.datetime.fromtimestamp(t) for t in dt]

        # trainInputs, testInputs = splitData(dataset)
        print("total=", len(dataset))
        trainData = dataset['glicemia'].values


        # hiperglicemia = any(glicemiaValue >= 200 for glicemiaValue in trainData)
        #
        # if hiperglicemia:
        #     glicemiaStatus = "HIPERGLICEMIA"
        # else:
        #     hipoglicemia = any(glicemiaValue <= 65 for glicemiaValue in trainData)
        #     if hipoglicemia:
        #         glicemiaStatus = "HIPOGLICEMIA"
        #
        # if glicemiaStatus != "HEALTHY":
        #     break

        trainData = trainData.reshape(-1, 1)

        train_network_model(trainData, saveModelFilePath)
        estimate_using_model(patientId)

        if withDelete is True:
            delete_oldest_data(filePath, sizeToKeep)

        dataset = read_clean_fill_invalid_data(filePath)
        lastDateTime = dataset['timestamp'].values[-1]
        # lastDateString = datetime.datetime.fromtimestamp(lastDateTime)

    # return lastDateString
    return datetime.datetime.fromtimestamp(lastDateTime)
    # return glicemiaStatus

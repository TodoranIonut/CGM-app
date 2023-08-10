from fastapi import FastAPI
from dao.NewMeasureDAO import NewMeasureDAO
from utils.fileUtils import get_model_full_path, read_clean_fill_invalid_data, get_data_full_path, \
    create_patient_csv_file, append_linear_data_to_patient_csv_file, create_directory_if_not_exist, \
    append_data_patient_csv_file, delete_oldest_data, get_patient_new_data_file_name, get_new_data_full_path, copy_file
from utils.modelDataUtils import splitData
from service.LSTMService import train_network_model,estimate_using_model
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


@app.get("/")
async def root():
    return {"Hellp": "World"}


@app.post("/api/newMeasure")
def add_new_measure(newMeasure: NewMeasureDAO):
    pcientIdString = str(newMeasure.patientId)

    pacientDirectoryName = "data\pacients\case_id_" + pcientIdString
    fileName = "case_id_" + pcientIdString + "_data.csv"

    crtDir = os.getcwd()
    directoryPath = os.path.join(crtDir, pacientDirectoryName)

    create_directory_if_not_exist(directoryPath)

    filePath = os.path.join(directoryPath, fileName)
    create_patient_csv_file(filePath)

    fileData = [newMeasure.timestamp, newMeasure.glucoseMgPerDl]

    append_data_patient_csv_file(filePath, fileData)
    return fileData


# uvicorn main:app --reload
# uvicorn main:app --reload

# def print_hi(name):
#     # Use a breakpoint in the code line below to debug your script.
#     print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.

@app.delete("/api/clean/{pacientId}")
def delete_old_measurements(pacientId: str):
    size_to_keep = 10

    pacientDirectoryName = "data\pacients\case_id_" + pacientId
    fileName = "case_id_" + pacientId + "_data.csv"

    crtDir = os.getcwd()
    directoryPath = os.path.join(crtDir, pacientDirectoryName)
    filePath = os.path.join(directoryPath, fileName)

    delete_oldest_data(filePath, size_to_keep)

    returnedMessage = "File " + fileName + " size is " + str(size_to_keep)
    return returnedMessage


@app.post("/api/train/{patientId}")
def start_train_patient_model(patientId: str):
    filePath = get_data_full_path(patientId)
    saveModelFilePath = get_model_full_path(patientId)
    dataset = read_clean_fill_invalid_data(filePath)

    newDataSetFile = get_new_data_full_path(patientId)
    copy_file(filePath,newDataSetFile)

    dt = dataset['timestamp'].values
    times = [datetime.datetime.fromtimestamp(t) for t in dt]

    # trainInputs, testInputs = splitData(dataset)
    print("total=", len(dataset))
    trainData = dataset['glicemia'].values
    trainData = trainData.reshape(-1, 1)

    # train_network_model(trainData, saveModelFilePath)
    return times


@app.get("/api/estimate/{patientId}")
def estimate_high_glicemia(patientId: str):
    estimate_using_model(patientId)
    return patientId

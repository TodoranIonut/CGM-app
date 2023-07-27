import csv
import math
import os

import numpy as np
import pandas as pd

from constants import PACIENT_DATA_FILE_SUFIX, PACIENT_MODEL_FILE_SUFIX, PACIENT_FILE_PREFIX, \
    PACIENT_DIRECTORY_PATH_PREFIX


def get_data_full_path(pacientId):
    pathDir = get_patient_directory_path(pacientId)
    dataFile = get_patient_data_file_name(pacientId)
    return os.path.join(pathDir, dataFile)


def get_model_full_path(pacientId):
    pathDir = get_patient_directory_path(pacientId)
    modelFile = get_patient_model_file_name(pacientId)
    return os.path.join(pathDir, modelFile)


def get_patient_directory_path(pacientId):
    crtDir = os.getcwd()
    return os.path.join(crtDir, PACIENT_DIRECTORY_PATH_PREFIX + pacientId)


def get_patient_data_file_name(pacientId):
    return PACIENT_FILE_PREFIX + pacientId + PACIENT_DATA_FILE_SUFIX


def get_patient_model_file_name(pacientId):
    return PACIENT_FILE_PREFIX + pacientId + PACIENT_MODEL_FILE_SUFIX


def load_data_from_file(path, fileName, featureName):
    crtDir = os.getcwd()
    filePath = os.path.join(crtDir, path, fileName)

    dataFrame = pd.read_csv(filePath)
    input = []

    for index, row in dataFrame.iterrows():
        featureRow = []
        for feature in featureName:
            featureRow.append(row[feature])
        input.append(featureRow)

    # return np.array(input)
    return input


def create_pacient_csv_file(filePath):
    # crtDir = os.getcwd()
    # directoryPath = os.path.join(crtDir, directory)
    #
    # create_directory_if_not_exist(directoryPath)
    #
    # filePath = os.path.join(directoryPath, file_name)

    if os.path.isfile(filePath):
        print(f"File '{filePath}' already exists.")
    else:
        print(f"File '{filePath}' created.")
        headers = ["timestamp", "glicemia"]  # table header
        df = pd.DataFrame(columns=headers)
        df.to_csv(filePath, index=False)


def append_data_pacient_csv_file(file_path, file_data):
    with open(file_path, 'a', newline='') as file:
        writer = csv.writer(file)

        # Append each row to the CSV file
        writer.writerow(file_data)
        # option with append line
        # for row in file_data:
        #     writer.writerow(row)


def append_linear_data_to_pacient_csv_file(file_path, file_data):
    # Read the existing CSV file

    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        rows = list(reader)

    if len(rows) < 2:
        # append new array to file
        with open(file_path, 'a', newline='') as file:
            writer = csv.writer(file)
            # Append each row to the CSV file
            writer.writerow(file_data)
    else:
        last_row_index = len(rows) - 1
        last_timestamp = int(rows[last_row_index][0])
        last_glicemia_value = float(rows[last_row_index][1])

        to_timesteamp = file_data[0][0]
        to_glicemia_value = file_data[0][1]

        timestamp_5_minutes = 300
        number_of_generated_values = int((to_timesteamp - last_timestamp) / timestamp_5_minutes)

        print(number_of_generated_values)

        new_timestamp_values = np.round(np.linspace(last_timestamp, to_timesteamp, number_of_generated_values + 1),
                                        decimals=0)

        new_glicemia_values = np.round(
            np.linspace(last_glicemia_value, to_glicemia_value, number_of_generated_values + 1), decimals=1)

        # asociate arrays
        matrice = np.column_stack((new_timestamp_values, new_glicemia_values))

        # append new array to file
        with open(file_path, 'a', newline='') as file:
            writer = csv.writer(file)

            # Append each row to the CSV file
            for row in matrice:
                writer.writerow(row)


def create_directory_if_not_exist(directoryPath):
    if not os.path.exists(directoryPath):
        os.makedirs(directoryPath)
        print(f"Directory '{directoryPath}' created.")
    else:
        print(f"Directory '{directoryPath}' already exists.")


def delete_oldest_data(file_path, size_to_keep):
    dataset = pd.read_csv(file_path)
    while len(dataset) > size_to_keep:
        dataset = dataset.drop(0)
        dataset.to_csv(file_path, index=False)
        dataset = pd.read_csv(file_path)


def read_clean_fill_invalid_data(filePath):
    dataset = pd.read_csv(filePath)
    find_start = False
    find_finish = False
    start_index = 0
    end_index = 0
    start_value = 0
    end_value = 0

    # clean begining
    while math.isnan(dataset.loc[0]['glicemia']):
        dataset = dataset.drop(0)
        dataset.to_csv(filePath, index=False)
        dataset = pd.read_csv(filePath)

    # clean ending
    lastIndex = len(dataset.index) - 1
    while math.isnan(dataset.loc[lastIndex]['glicemia']):
        dataset = dataset.drop(lastIndex)
        dataset.to_csv(filePath, index=False)
        dataset = pd.read_csv(filePath)
        lastIndex = len(dataset.index) - 1

    dataset = pd.read_csv(filePath)
    for index, row in dataset.iterrows():
        if find_start is False:
            if math.isnan(row['glicemia']):
                start_index = index
                start_value = dataset.loc[index - 1]['glicemia']
                find_start = True
        if find_start is True:
            if math.isnan(row['glicemia']):
                end_index = index
                end_value = dataset.loc[index + 1]['glicemia']
                find_finish = True
        if find_start is True and find_finish is True:
            if math.isnan(row['glicemia']) is not True:
                # single missing value
                if start_index == end_index:
                    media = (dataset.loc[index - 2]['glicemia'] + dataset.loc[index]['glicemia']) / 2
                    media = np.round(media, decimals=1)
                    dataset.loc[index - 1] = [row['timestamp'], media]
                else:
                    # to include head and tail values +2 and +1 for index
                    number_of_generated_values = end_index - start_index + 3
                    new_values = np.round(np.linspace(start_value, end_value, number_of_generated_values), decimals=1)
                    new_values = new_values[1:-1]  # remove head and tail
                    # multiple values
                    new_index = 0
                    for replace_index in range(start_index, end_index + 1):
                        dataset.loc[replace_index] = [row['timestamp'], new_values[new_index]]
                        new_index = new_index + 1
                find_start = False
                find_finish = False
    dataset.to_csv(filePath, index=False)
    return pd.read_csv(filePath)

from fastapi import FastAPI
from dao.NewMeasureDAO import NewMeasureDAO
from utils.fileUtils import create_pacient_csv_file, append_linear_data_to_pacient_csv_file, create_directory_if_not_exist,append_data_pacient_csv_file,delete_oldest_data
import os
app = FastAPI()


@app.get("/")
async def root():
    return {"Hellp": "World"}


@app.post("/api/v1/newMeasure")
def add_new_measure(newMeasure: NewMeasureDAO):

    pcientIdString = str(newMeasure.patientId)

    pacientDirectoryName = "data\pacients\case_id_" + pcientIdString
    fileName = "case_id_" + pcientIdString + "_data.csv"

    crtDir = os.getcwd()
    directoryPath = os.path.join(crtDir, pacientDirectoryName)

    create_directory_if_not_exist(directoryPath)

    filePath = os.path.join(directoryPath, fileName)
    create_pacient_csv_file(filePath)

    # filePath = pacientDirectoryName + fileName
    fileData = [newMeasure.timestamp,newMeasure.glucoseMgPerDl]

    append_data_pacient_csv_file(filePath, fileData)
    return fileData

# def print_hi(name):
#     # Use a breakpoint in the code line below to debug your script.
#     print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.
#
#
# # Press the green button in the gutter to run the script.
# if __name__ == '__main__':
#     print_hi('PyCharm')
#
# # See PyCharm help at https://www.jetbrains.com/help/pycharm/

@app.delete("/api/v1/clean/{pacientId}")
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

@app.post("/api/v1/train/{pacientId}")
def start_train_pacient_model(pacientId: str):

    pacientDirectoryName = "data\pacients\case_id_" + pacientId
    fileName = "case_id_" + pacientId + "_data.csv"

    crtDir = os.getcwd()
    directoryPath = os.path.join(crtDir, pacientDirectoryName)
    filePath = os.path.join(directoryPath, fileName)

    delete_oldest_data(filePath, size_to_keep)

    returnedMessage = "File " + fileName + " size is " + str(size_to_keep)
    return returnedMessage

@app.post("/api/v1/estimate/{pacientId}")
def estimate_high_glicemia(pacientId: str):

    size_to_keep = 10
    pcientIdString = pacientId

    pacientDirectoryName = "data\pacients\case_id_" + pcientIdString
    fileName = "case_id_" + pcientIdString + "_data.csv"

    crtDir = os.getcwd()
    directoryPath = os.path.join(crtDir, pacientDirectoryName)
    filePath = os.path.join(directoryPath, fileName)

    delete_oldest_data(filePath, size_to_keep)

    returnedMessage = "File " + fileName + " size is " + str(size_to_keep)
    return returnedMessage
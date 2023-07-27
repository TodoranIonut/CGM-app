package com.CGMspringboot.service.neuralNetwork;

public interface NeuralNetworkService {

    void createUserMonitoringDataLocation(Integer id);

    void addUserDataToTrainingSet(Integer id, long timestamp, float glucoseMgPerDl);

    void trainUserModel(Integer id);

    long makeTemporalPrediction(Integer id);
}

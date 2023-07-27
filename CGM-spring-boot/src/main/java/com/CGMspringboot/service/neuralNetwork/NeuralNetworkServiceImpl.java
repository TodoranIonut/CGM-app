package com.CGMspringboot.service.neuralNetwork;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NeuralNetworkServiceImpl implements NeuralNetworkService{

    RestTemplate restTemplate = new RestTemplate();

    @Override
    public void createUserMonitoringDataLocation(Integer id) {

        String fooResourceUrl = "http://localhost:8000";
        ResponseEntity<String> response = restTemplate.getForEntity(fooResourceUrl, String.class);
//        return response;
    }

    @Override
    public void addUserDataToTrainingSet(Integer id, long timestamp, float glucoseMgPerDl) {

    }

    @Override
    public void trainUserModel(Integer id) {

    }

    @Override
    public long makeTemporalPrediction(Integer id) {
        return 0;
    }
}

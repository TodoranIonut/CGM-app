package com.CGMspringboot.service.aiService;

import com.CGMspringboot.domain.ai.GlucoseLevelNewMeasure;
import com.CGMspringboot.exceptions.appUser.UserEmailNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;

public interface ComputingService {

    void addGlucoseMeasureToDataset(GlucoseLevelNewMeasure glucoseLevel) throws JsonProcessingException;
    ResponseEntity<String> computeDiagnostic(String patientEmail, Integer days) throws UserEmailNotFoundException;
}

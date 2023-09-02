package com.CGMspringboot.service.aiService;

import com.CGMspringboot.domain.ai.GlucoseLevelNewMeasure;
import com.CGMspringboot.domain.entity.Patient;
import com.CGMspringboot.exceptions.appUser.UserEmailNotFoundException;
import com.CGMspringboot.service.patientService.PatientService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@RequiredArgsConstructor
public class ComputingServiceImpl implements ComputingService{

    private final PatientService patientService;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String resourceBaseUrl = "http://localhost:8000";
    private final String newMeasureApi = "/api/newMeasure";
    private final String computeDiagnosticApi = "/api/computeDiagnostic/%s/%s";


    @Override
    public void addGlucoseMeasureToDataset(GlucoseLevelNewMeasure glucoseLevel) throws JsonProcessingException {

        String requestUrl = resourceBaseUrl + newMeasureApi;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        String requestBody = objectMapper.writeValueAsString(glucoseLevel);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(requestUrl, HttpMethod.POST,requestEntity,String.class);
    }

    @Override
    public ResponseEntity<String> computeDiagnostic(String patientEmail, Integer days) throws UserEmailNotFoundException {

        Patient patient = patientService.findPatientByEmail(patientEmail);

        long currentTimestampSeconds = System.currentTimeMillis() / 1000;
        int daysToTimestamp = days * 24 * 60 * 60;
        long untilTimestampEstimation = currentTimestampSeconds + daysToTimestamp;

        String requestUrl = String.format(resourceBaseUrl + computeDiagnosticApi, patient.getId(), untilTimestampEstimation);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(headers);

        return restTemplate.exchange(requestUrl, HttpMethod.GET,requestEntity ,String.class);
    }
}

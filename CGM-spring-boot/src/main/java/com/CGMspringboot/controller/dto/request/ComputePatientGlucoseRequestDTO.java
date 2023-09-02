package com.CGMspringboot.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComputePatientGlucoseRequestDTO {

    private String patientEmail;
    private int days;
}

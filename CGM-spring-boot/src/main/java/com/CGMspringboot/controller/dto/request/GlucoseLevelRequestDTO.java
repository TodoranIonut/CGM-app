package com.CGMspringboot.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GlucoseLevelRequestDTO {

    private String patientEmail;
//    private long timeStamp;
    private float glucoseMgPerDl;
}

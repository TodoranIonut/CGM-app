package com.CGMspringboot.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetGlucoseLevelRequestDTO {

    private String patientEmail;
    private long startTimestamp;
    private long endTimestamp;
}

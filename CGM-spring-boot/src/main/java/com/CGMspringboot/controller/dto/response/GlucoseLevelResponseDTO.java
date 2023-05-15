package com.CGMspringboot.controller.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GlucoseLevelResponseDTO {

    private long timeStamp;
    private float glucoseMgPerDl;
}

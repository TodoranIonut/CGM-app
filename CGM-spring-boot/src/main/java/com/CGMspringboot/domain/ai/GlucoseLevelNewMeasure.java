package com.CGMspringboot.domain.ai;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GlucoseLevelNewMeasure {

    private int patientId;
    private long timestamp;
    private float glucoseMgPerDl;
}

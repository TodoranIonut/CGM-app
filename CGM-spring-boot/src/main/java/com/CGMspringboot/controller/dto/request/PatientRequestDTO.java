package com.CGMspringboot.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PatientRequestDTO {

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String cnp;
    private String gender;
    private int age;
    private float heightCm;
    private float weightKg;
    private String diagnostic;
    private Integer doctorId;
}

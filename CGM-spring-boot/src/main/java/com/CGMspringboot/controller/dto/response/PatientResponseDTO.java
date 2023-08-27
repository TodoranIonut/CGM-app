package com.CGMspringboot.controller.dto.response;

import com.CGMspringboot.domain.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PatientResponseDTO {

    private Integer patientId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String cnp;
    private Role role;
    private String gender;
    private int age;
    private float heightCm;
    private float weightKg;
    private String diagnostic;
    private Integer doctorId;
}

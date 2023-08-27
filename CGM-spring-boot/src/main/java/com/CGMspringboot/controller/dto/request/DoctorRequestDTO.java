package com.CGMspringboot.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DoctorRequestDTO {

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String password;
    private String cnp;
    private String clinic;
}

package com.CGMspringboot.controller.dto.response;

import com.CGMspringboot.domain.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DoctorResponseDTO {

    private Integer doctorId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String cnp;
    private Role role;
    private String clinic;
}

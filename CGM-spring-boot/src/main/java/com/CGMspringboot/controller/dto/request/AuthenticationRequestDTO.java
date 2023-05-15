package com.CGMspringboot.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationRequestDTO {

    private String email;
    private String password;
}

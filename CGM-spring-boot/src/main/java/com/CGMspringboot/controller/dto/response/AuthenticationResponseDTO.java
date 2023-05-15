package com.CGMspringboot.controller.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticationResponseDTO{

    private String token;
}

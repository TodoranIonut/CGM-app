package com.CGMspringboot.controller;

import com.CGMspringboot.controller.dto.request.AuthenticationRequestDTO;
import com.CGMspringboot.controller.dto.response.AuthenticationResponseDTO;
import com.CGMspringboot.service.auth.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;

    @PostMapping
    public ResponseEntity<AuthenticationResponseDTO> authenticate(@RequestBody AuthenticationRequestDTO authenticationRequest) {
        AuthenticationResponseDTO response = authService.authenticate(authenticationRequest);
        return ResponseEntity.ok().body(response);
    }
}

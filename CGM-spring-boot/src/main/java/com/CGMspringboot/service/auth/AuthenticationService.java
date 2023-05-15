package com.CGMspringboot.service.auth;

import com.CGMspringboot.controller.dto.request.AuthenticationRequestDTO;
import com.CGMspringboot.controller.dto.response.AuthenticationResponseDTO;
import com.CGMspringboot.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public AuthenticationResponseDTO authenticate(AuthenticationRequestDTO authenticationRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()
                )
        );

        var userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());

        String jwtToken = jwtService.generateToken(userDetails);
        return AuthenticationResponseDTO.builder()
                .token(jwtToken)
                .build();
    }
}

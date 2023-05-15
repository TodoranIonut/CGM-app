package com.CGMspringboot.service.auth;

import com.CGMspringboot.domain.entity.Admin;
import com.CGMspringboot.domain.entity.Doctor;
import com.CGMspringboot.domain.entity.Patient;
import com.CGMspringboot.domain.repository.AdminRepository;
import com.CGMspringboot.domain.repository.DoctorRepository;
import com.CGMspringboot.domain.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserDetails userDetails;
        Doctor doctor = doctorRepository.findByEmail(email).orElse(null);
        if (doctor == null) {
            Patient patient = patientRepository.findByEmail(email).orElse(null);
            if (patient == null) {
                Admin admin = adminRepository.findByEmail(email).orElse(null);
                if (admin == null) {
                    log.info("User not found, authentication failed");
                    throw new UsernameNotFoundException("User not found, authentication failed");
                } else {
                    userDetails = User.builder().username(admin.getEmail()).password(admin.getPassword()).roles(admin.getRole().name()).build();
                }
            } else {
                userDetails = User.builder().username(patient.getEmail()).password(patient.getPassword()).roles(patient.getRole().name()).build();
            }
        } else {
            userDetails = User.builder().username(doctor.getEmail()).password(doctor.getPassword()).roles(doctor.getRole().name()).build();
        }
        return userDetails;
    }
}

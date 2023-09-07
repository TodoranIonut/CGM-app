package com.CGMspringboot.service.doctorService;

import com.CGMspringboot.domain.entity.Doctor;
import com.CGMspringboot.domain.entity.Role;
import com.CGMspringboot.domain.repository.DoctorRepository;
import com.CGMspringboot.domain.repository.PatientRepository;
import com.CGMspringboot.exceptions.CGMApplicationException;
import com.CGMspringboot.exceptions.appUser.UserEmailConflictException;
import com.CGMspringboot.exceptions.appUser.UserEmailNotFoundException;
import com.CGMspringboot.exceptions.appUser.UserIdNotFoundException;
import com.CGMspringboot.exceptions.appUser.UserPhoneNumberConflictException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Doctor findDoctorById(Integer doctorId) throws UserIdNotFoundException {
        return doctorRepository.findById(doctorId)
                .orElseThrow(() -> {
                    log.debug("id {} is NOT found", doctorId);
                    return new UserIdNotFoundException(doctorId);
                });
    }

    @Override
    public Doctor findDoctorByEmail(String email) throws UserEmailNotFoundException {
        return doctorRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.debug("mail {} is NOT found", email);
                    return new UserEmailNotFoundException(email);
                });
    }

    @Override
    public Doctor registerNewDoctor(Doctor doctor) throws CGMApplicationException {
        checkDoctorEmailIsAvailable(doctor.getEmail());
        checkDoctorPhoneNumberIsAvailable(doctor.getPhoneNumber());
        doctor.setPassword(passwordEncoder.encode(doctor.getCnp()));
        doctor.setRole(Role.DOCTOR);
        log.info("save user {}", doctor.getEmail());
        return doctorRepository.save(doctor);
    }

    @Override
    public Doctor updateDoctor(Integer doctorId, Doctor doctor) throws CGMApplicationException {
        Doctor findDoctor = findDoctorById(doctorId);
        if (!findDoctor.getEmail().equals(doctor.getEmail())) {
            checkDoctorEmailIsAvailable(doctor.getEmail());
        }
        if (!findDoctor.getPhoneNumber().equals(doctor.getPhoneNumber())) {
            checkDoctorPhoneNumberIsAvailable(doctor.getPhoneNumber());
        }
        findDoctor.setFirstName(doctor.getFirstName());
        findDoctor.setLastName(doctor.getLastName());
        findDoctor.setCnp(doctor.getCnp());
        findDoctor.setEmail(doctor.getEmail());
        findDoctor.setPhoneNumber(doctor.getPhoneNumber());
        findDoctor.setClinic(doctor.getClinic());
        doctorRepository.save(findDoctor);
        log.info("updated user id {}", findDoctor.getId());
        return findDoctor;
    }

    @Override
    public void deleteDoctorById(Integer doctorId) {
        try {
            Doctor findDoctor = findDoctorById(doctorId);
            log.info("delete user with id {}", findDoctor);
            doctorRepository.delete(findDoctor);
        } catch (CGMApplicationException ignore) {
            log.info("attempt to delete user with id {}", doctorId);
        }
    }

    @Override
    public void checkDoctorPhoneNumberIsAvailable(String phoneNumber) throws UserPhoneNumberConflictException {
        if (doctorRepository.existsDoctorByPhoneNumber(phoneNumber) || patientRepository.existsPatientByPhoneNumber(phoneNumber)) {
            log.debug("phone number {} is NOT available", phoneNumber);
            throw new UserPhoneNumberConflictException(phoneNumber);
        }
    }

    @Override
    public void checkDoctorEmailIsAvailable(String email) throws UserEmailConflictException {
        if (doctorRepository.existsDoctorByEmail(email) || patientRepository.existsPatientByEmail(email)) {
            log.debug("email {} is NOT available", email);
            throw new UserEmailConflictException(email);
        }
    }
}

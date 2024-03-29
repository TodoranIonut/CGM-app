package com.CGMspringboot.service.patientService;

import com.CGMspringboot.domain.entity.Admin;
import com.CGMspringboot.domain.entity.Doctor;
import com.CGMspringboot.domain.entity.Patient;
import com.CGMspringboot.domain.entity.Role;
import com.CGMspringboot.domain.repository.AdminRepository;
import com.CGMspringboot.domain.repository.DoctorRepository;
import com.CGMspringboot.domain.repository.PatientRepository;
import com.CGMspringboot.exceptions.CGMApplicationException;
import com.CGMspringboot.exceptions.appUser.UserEmailConflictException;
import com.CGMspringboot.exceptions.appUser.UserEmailNotFoundException;
import com.CGMspringboot.exceptions.appUser.UserIdNotFoundException;
import com.CGMspringboot.exceptions.appUser.UserPhoneNumberConflictException;
import com.CGMspringboot.service.doctorService.DoctorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService{

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final DoctorService doctorService;

    @Override
    public Patient findPatientById(Integer patientId) throws UserIdNotFoundException {
        return patientRepository.findById(patientId)
                .orElseThrow(() -> {
                    log.debug("patient with id {} is NOT found", patientId);
                    return new UserIdNotFoundException(patientId);
                });
    }

    @Override
    public Patient findPatientByEmail(String email) throws UserEmailNotFoundException {
        return patientRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.debug("patient with mail {} is NOT found", email);
                    return new UserEmailNotFoundException(email);
                });
    }

    @Override
    public Patient registerNewPatient(Patient patient) throws CGMApplicationException {
        checkPatientEmailIsAvailable(patient.getEmail());
        checkPatientPhoneNumberIsAvailable(patient.getPhoneNumber());
        Doctor doctor = doctorService.findDoctorByEmail(patient.getDoctor().getEmail());
        patient.setDoctor(doctor);
        patient.setPassword(passwordEncoder.encode(patient.getCnp()));
        patient.setRole(Role.PATIENT);
        log.info("save user {}", patient.getEmail());
        return patientRepository.save(patient);
    }

    @Override
    public Patient updatePatient(Integer patientId, Patient patient) throws CGMApplicationException {
        Patient findPatient = findPatientById(patientId);
        if(!findPatient.getEmail().equals(patient.getEmail())){
            checkPatientEmailIsAvailable(patient.getEmail());
        }
        if(!findPatient.getPhoneNumber().equals(patient.getPhoneNumber())) {
            checkPatientPhoneNumberIsAvailable(patient.getPhoneNumber());
        }
        findPatient.setFirstName(patient.getFirstName());
        findPatient.setLastName(patient.getLastName());
        findPatient.setEmail(patient.getEmail());
        findPatient.setCnp(patient.getCnp());
        findPatient.setGender(patient.getGender());
        findPatient.setPhoneNumber(patient.getPhoneNumber());
        findPatient.setAge(patient.getAge());
        findPatient.setWeightKg(patient.getWeightKg());
        findPatient.setHeightCm(patient.getHeightCm());
        findPatient.setDiagnostic(patient.getDiagnostic());
        patientRepository.save(findPatient);
        log.info("updated user id {}", findPatient.getId());
        return findPatient;
    }

    @Override
    public void deletePatientById(Integer patientId) {
        try {
            Patient findPatient = findPatientById(patientId);
            log.info("delete user with id {}", findPatient);
            patientRepository.delete(findPatient);
        } catch (CGMApplicationException ignore) {
            log.info("attempt to delete user with id {}", patientId);
        }
    }

    @Override
    public void checkPatientPhoneNumberIsAvailable(String phoneNumber) throws UserPhoneNumberConflictException {
        if (patientRepository.existsPatientByPhoneNumber(phoneNumber) || doctorRepository.existsDoctorByPhoneNumber(phoneNumber)) {
            log.debug("phone number {} is NOT available", phoneNumber);
            throw new UserPhoneNumberConflictException(phoneNumber);
        }
    }

    @Override
    public void checkPatientEmailIsAvailable(String email) throws UserEmailConflictException {
        if (patientRepository.existsPatientByPhoneNumber(email) || doctorRepository.existsDoctorByEmail(email)) {
            log.debug("email {} is NOT available", email);
            throw new UserEmailConflictException(email);
        }
    }

    @Override
    public List<Patient> findPatientsByDoctor(Integer doctorId) {
        return patientRepository.findAllByDoctorId(doctorId);
    }

    @Override
    public List<Patient> findPatientsByDoctorEmail(String email) throws UserEmailNotFoundException {
        Doctor doctor = doctorRepository.findByEmail(email).orElse(null);
        if (doctor == null) {
            throw new UserEmailNotFoundException(email);
        }
        return patientRepository.findAllByDoctorId(doctor.getId());
    }
}

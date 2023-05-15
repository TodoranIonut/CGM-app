package com.CGMspringboot.service.patientService;

import com.CGMspringboot.domain.entity.Patient;
import com.CGMspringboot.exceptions.CGMApplicationException;
import com.CGMspringboot.exceptions.appUser.UserEmailConflictException;
import com.CGMspringboot.exceptions.appUser.UserEmailNotFoundException;
import com.CGMspringboot.exceptions.appUser.UserIdNotFoundException;
import com.CGMspringboot.exceptions.appUser.UserPhoneNumberConflictException;

import java.util.List;

public interface PatientService {

    Patient findPatientById(Integer patientId) throws UserIdNotFoundException;

    Patient findPatientByEmail(String email) throws UserEmailNotFoundException;

    Patient registerNewPatient(Patient patient) throws CGMApplicationException;

    Patient updatePatient(Integer patientId, Patient patient) throws CGMApplicationException;

    List<Patient> findPatientsByDoctor(Integer doctorId);

    void deletePatientById(Integer patientId);

    void checkPatientPhoneNumberIsAvailable(String phoneNumber) throws UserPhoneNumberConflictException;

    void checkPatientEmailIsAvailable(String email) throws UserEmailConflictException;
}

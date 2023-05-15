package com.CGMspringboot.service.doctorService;

import com.CGMspringboot.domain.entity.Doctor;
import com.CGMspringboot.exceptions.CGMApplicationException;
import com.CGMspringboot.exceptions.appUser.UserEmailConflictException;
import com.CGMspringboot.exceptions.appUser.UserEmailNotFoundException;
import com.CGMspringboot.exceptions.appUser.UserIdNotFoundException;
import com.CGMspringboot.exceptions.appUser.UserPhoneNumberConflictException;

public interface DoctorService {

    Doctor findDoctorById(Integer doctorId) throws UserIdNotFoundException;

    Doctor findDoctorByEmail(String email) throws UserEmailNotFoundException;

    Doctor registerNewDoctor(Doctor doctor) throws CGMApplicationException;

    Doctor updateDoctor(Integer doctorId, Doctor doctor) throws CGMApplicationException;

    void deleteDoctorById(Integer doctorId);

    void checkDoctorPhoneNumberIsAvailable(String phoneNumber) throws UserPhoneNumberConflictException;

    void checkDoctorEmailIsAvailable(String email) throws UserEmailNotFoundException, UserEmailConflictException;
}

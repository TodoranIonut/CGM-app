package com.CGMspringboot.domain.repository;

import com.CGMspringboot.domain.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {

    Optional<Patient> findByEmail(String email);

    boolean existsPatientByEmail(String email);

    boolean existsPatientByPhoneNumber(String phoneNumber);

    List<Patient> findAllByDoctorId(Integer doctorId);
}

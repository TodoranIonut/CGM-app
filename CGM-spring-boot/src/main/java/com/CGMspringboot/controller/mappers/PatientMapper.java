package com.CGMspringboot.controller.mappers;

import com.CGMspringboot.controller.dto.request.PatientRequestDTO;
import com.CGMspringboot.controller.dto.response.PatientResponseDTO;
import com.CGMspringboot.domain.entity.Doctor;
import com.CGMspringboot.domain.entity.Patient;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class PatientMapper {

    public PatientResponseDTO toPatientResponseDTO(Patient patient) {
        if (patient == null) {
            return null;
        }

        PatientResponseDTO patientResponseDTO = new PatientResponseDTO();

        patientResponseDTO.setPatientId(patient.getId());
        patientResponseDTO.setFirstName(patient.getFirstName());
        patientResponseDTO.setLastName(patient.getLastName());
        patientResponseDTO.setEmail(patient.getEmail());
        patientResponseDTO.setPhoneNumber(patient.getPhoneNumber());
        patientResponseDTO.setCnp(patient.getCnp());
        patientResponseDTO.setRole(patient.getRole());
        patientResponseDTO.setGender(patient.getGender().name());
        patientResponseDTO.setAge(patient.getAge());
        patientResponseDTO.setWeightKg(patient.getWeightKg());
        patientResponseDTO.setHeightCm(patient.getHeightCm());
        patientResponseDTO.setDoctorId(patient.getDoctor().getId());
        patientResponseDTO.setDiagnostic(patient.getDiagnostic().name());

        return patientResponseDTO;
    }

    public Patient toPatient(PatientRequestDTO patientRequestDTO) {
        if (patientRequestDTO == null) {
            return null;
        }

        Patient patient = new Patient();

        patient.setFirstName(patientRequestDTO.getFirstName());
        patient.setLastName(patientRequestDTO.getLastName());
        patient.setEmail(patientRequestDTO.getEmail());
        patient.setPhoneNumber(patientRequestDTO.getPhoneNumber());
        patient.setCnp(patientRequestDTO.getCnp());
        patient.setGender(Patient.Gender.valueOf(patientRequestDTO.getGender()));
        patient.setAge(patientRequestDTO.getAge());
        patient.setWeightKg(patientRequestDTO.getWeightKg());
        patient.setHeightCm(patientRequestDTO.getHeightCm());
        patient.setDiagnostic(Patient.Diagnostic.valueOf(patientRequestDTO.getDiagnostic()));

        Doctor doctor = new Doctor();
        doctor.setEmail(patientRequestDTO.getDoctorEmail());
        patient.setDoctor(doctor);

        return patient;
    }

    public List<PatientResponseDTO> toPatientResponseDTOList(List<Patient> patientList) {
        if (patientList.isEmpty()) {
            return Collections.emptyList();
        }

        List<PatientResponseDTO> patientResponseDTOList = new ArrayList<>();
        for (Patient patient : patientList) {
            patientResponseDTOList.add(toPatientResponseDTO(patient));
        }

        return patientResponseDTOList;
    }
}

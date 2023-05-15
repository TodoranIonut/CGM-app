package com.CGMspringboot.controller.mappers;

import com.CGMspringboot.controller.dto.request.DoctorRequestDTO;
import com.CGMspringboot.controller.dto.response.DoctorResponseDTO;
import com.CGMspringboot.domain.entity.Doctor;
import org.springframework.stereotype.Component;

@Component
public class DoctorMapper {

    public DoctorResponseDTO toDoctorResponseDTO(Doctor doctor) {
        if (doctor == null) {
            return null;
        }

        DoctorResponseDTO doctorResponseDTO = new DoctorResponseDTO();

        doctorResponseDTO.setDoctorId(doctor.getId());
        doctorResponseDTO.setFirstName(doctor.getFirstName());
        doctorResponseDTO.setLastName(doctor.getLastName());
        doctorResponseDTO.setEmail(doctor.getEmail());
        doctorResponseDTO.setPhoneNumber(doctor.getPhoneNumber());
        doctorResponseDTO.setRole(doctor.getRole());
        doctorResponseDTO.setClinic(doctor.getClinic());

        return doctorResponseDTO;
    }

    public Doctor toDoctor(DoctorRequestDTO doctorRequestDTO) {
        if (doctorRequestDTO == null) {
            return null;
        }

        Doctor doctor = new Doctor();

        doctor.setFirstName(doctorRequestDTO.getFirstName());
        doctor.setLastName(doctorRequestDTO.getLastName());
        doctor.setPhoneNumber(doctorRequestDTO.getPhoneNumber());
        doctor.setEmail(doctorRequestDTO.getEmail());
        doctor.setPassword(doctorRequestDTO.getPassword());
        doctor.setClinic(doctorRequestDTO.getClinic());

        return doctor;
    }
}

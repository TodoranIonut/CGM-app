package com.CGMspringboot.controller;

import com.CGMspringboot.controller.dto.request.PatientRequestDTO;
import com.CGMspringboot.controller.dto.response.PatientResponseDTO;
import com.CGMspringboot.controller.mappers.PatientMapper;
import com.CGMspringboot.domain.entity.Patient;
import com.CGMspringboot.exceptions.CGMApplicationException;
import com.CGMspringboot.exceptions.appUser.UserEmailNotFoundException;
import com.CGMspringboot.exceptions.appUser.UserIdNotFoundException;
import com.CGMspringboot.service.patientService.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/patient")
public class PatientController {

    private final PatientService patientService;
    private final PatientMapper patientMapper;

    @GetMapping("/id/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public ResponseEntity<PatientResponseDTO> getPatientById(@PathVariable Integer id) throws UserIdNotFoundException {
        Patient patient = patientService.findPatientById(id);
        PatientResponseDTO patientResponseDTO = patientMapper.toPatientResponseDTO(patient);
        return ResponseEntity.ok().body(patientResponseDTO);
    }

    @GetMapping("/byEmail/{email}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public ResponseEntity<PatientResponseDTO> getPatientByEmail(@PathVariable String email) throws UserEmailNotFoundException {
        Patient patient = patientService.findPatientByEmail(email);
        PatientResponseDTO patientResponseDTO = patientMapper.toPatientResponseDTO(patient);
        return ResponseEntity.ok().body(patientResponseDTO);
    }

    @PostMapping("/register")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ResponseEntity<PatientResponseDTO> registerPatient(@RequestBody PatientRequestDTO patientRequestDTO) throws CGMApplicationException {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/patient/register").toUriString());
        Patient patient = patientMapper.toPatient(patientRequestDTO);
        Patient registeredPatient = patientService.registerNewPatient(patient);
        PatientResponseDTO patientResponseDTO = patientMapper.toPatientResponseDTO(registeredPatient);
        return ResponseEntity.created(uri).body(patientResponseDTO);
    }

    @PutMapping("/update/id/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public ResponseEntity<PatientResponseDTO> updatePatient(@PathVariable Integer id, @RequestBody PatientRequestDTO patientRequestDTO) throws CGMApplicationException {
        Patient patient = patientMapper.toPatient(patientRequestDTO);
        Patient updatedPatient = patientService.updatePatient(id, patient);
        PatientResponseDTO patientResponseDTO = patientMapper.toPatientResponseDTO(updatedPatient);
        return ResponseEntity.ok().body(patientResponseDTO);
    }

    @DeleteMapping("/delete/id/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ResponseEntity<String> deletePatientById(@PathVariable Integer id) {
        patientService.deletePatientById(id);
        return ResponseEntity.ok().body("delete user id " + id);
    }

    @GetMapping("/byDoctor/id/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ResponseEntity<List<PatientResponseDTO>> getPatientsByDoctorId(@PathVariable Integer id) throws UserIdNotFoundException {
        List<Patient> patientList = patientService.findPatientsByDoctor(id);
        List<PatientResponseDTO> patientResponseDTOList = patientMapper.toPatientResponseDTOList(patientList);
        return ResponseEntity.ok().body(patientResponseDTOList);
    }

    @GetMapping("/byDoctorEmail/{email}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public ResponseEntity<List<PatientResponseDTO>> getPatientsByDoctorEmail(@PathVariable String email) throws UserIdNotFoundException, UserEmailNotFoundException {
        List<Patient> patientList = patientService.findPatientsByDoctorEmail(email);
        List<PatientResponseDTO> patientResponseDTOList = patientMapper.toPatientResponseDTOList(patientList);
        return ResponseEntity.ok().body(patientResponseDTOList);
    }

}

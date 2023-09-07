package com.CGMspringboot.controller;

import com.CGMspringboot.controller.dto.request.ComputePatientGlucoseRequestDTO;
import com.CGMspringboot.controller.dto.request.GetGlucoseLevelRequestDTO;
import com.CGMspringboot.controller.dto.request.GlucoseLevelRequestDTO;
import com.CGMspringboot.controller.dto.response.GlucoseLevelResponseDTO;
import com.CGMspringboot.controller.mappers.GlucoseLevelMapper;
import com.CGMspringboot.domain.entity.GlucoseLevel;
import com.CGMspringboot.exceptions.CGMApplicationException;
import com.CGMspringboot.exceptions.appUser.UserEmailNotFoundException;
import com.CGMspringboot.exceptions.appUser.UserIdNotFoundException;
import com.CGMspringboot.exceptions.date.InvalidDateFormatException;
import com.CGMspringboot.service.aiService.ComputingService;
import com.CGMspringboot.service.glucoseLevel.GlucoseLevelService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.protocol.types.Field;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/glucose")
public class GlucoseLevelController {

    private final GlucoseLevelService glucoseLevelService;
    private final GlucoseLevelMapper glucoseLevelMapper;
    private final ComputingService computingService;

    @PostMapping("/save")
//    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public ResponseEntity<GlucoseLevelResponseDTO> saveGlucoseLevel(@RequestBody GlucoseLevelRequestDTO glucoseLevelRequestDTO) throws UserEmailNotFoundException, JsonProcessingException {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/glucose/save").toUriString());
        GlucoseLevel glucoseLevel = glucoseLevelMapper.toGlucoseLevel(glucoseLevelRequestDTO);
        GlucoseLevel savedGlucoseLevel = glucoseLevelService.saveGlucoseLevel(glucoseLevel);
        GlucoseLevelResponseDTO glucoseLevelResponseDTO = glucoseLevelMapper.toGlucoseLevelResponseDTO(savedGlucoseLevel);
        return ResponseEntity.created(uri).body(glucoseLevelResponseDTO);
    }

    @GetMapping("/byDate/patient/email/{email}")
//    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public ResponseEntity<List<GlucoseLevelResponseDTO>> getDailyGlucoseLevel(@PathVariable String email, @RequestParam String dateFormat, @RequestParam String date) throws CGMApplicationException {
        SimpleDateFormat simpleDateFormat = null;
        Date formatedDate = null;
        try {
            simpleDateFormat = new SimpleDateFormat(dateFormat);
            formatedDate = simpleDateFormat.parse(date);
        } catch (IllegalArgumentException | ParseException e) {
            throw new InvalidDateFormatException();
        }
        List<GlucoseLevel> dalyGlucoseLevel = glucoseLevelService.getGlucoseLevelByDate(formatedDate, email);
        List<GlucoseLevelResponseDTO> responseList = glucoseLevelMapper.toGlucoseLevelResponseDTOList(dalyGlucoseLevel);
        return ResponseEntity.ok().body(responseList);
    }

    @PostMapping("/byTimestamp")
//    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public ResponseEntity<List<GlucoseLevelResponseDTO>> getGlucoseStartWithSpecificTimestamp(@RequestBody GetGlucoseLevelRequestDTO getGlucoseLevelRequestDTO) {
        List<GlucoseLevel> dalyGlucoseLevel = glucoseLevelService.getGlucoseLevelAfterStartTimestamp(getGlucoseLevelRequestDTO.getPatientEmail(), getGlucoseLevelRequestDTO.getStartTimestamp());
        List<GlucoseLevelResponseDTO> responseList = glucoseLevelMapper.toGlucoseLevelResponseDTOList(dalyGlucoseLevel);
        return ResponseEntity.ok().body(responseList);
    }

    @PostMapping("/byTimestampInterval")
//    @PreAuthorize("hasAnyRole('ADMIN','DOCTOR','PATIENT')")
    public ResponseEntity<List<GlucoseLevelResponseDTO>> getGlucoseByTimestampInterval(@RequestBody GetGlucoseLevelRequestDTO getGlucoseLevelRequestDTO) {
        List<GlucoseLevel> dalyGlucoseLevel = glucoseLevelService.getGlucoseLevelByTimestamp(getGlucoseLevelRequestDTO.getPatientEmail(), getGlucoseLevelRequestDTO.getStartTimestamp(), getGlucoseLevelRequestDTO.getEndTimestamp());
        List<GlucoseLevelResponseDTO> responseList = glucoseLevelMapper.toGlucoseLevelResponseDTOList(dalyGlucoseLevel);
        return ResponseEntity.ok().body(responseList);
    }

    @PostMapping("/compute")
    public ResponseEntity<String> computeAndEstimateFutureGlucoseLevels(@RequestBody ComputePatientGlucoseRequestDTO computePatientGlucoseRequestDTO) throws UserEmailNotFoundException {
        return computingService.computeDiagnostic(computePatientGlucoseRequestDTO.getPatientEmail(), computePatientGlucoseRequestDTO.getDays());
    }
}

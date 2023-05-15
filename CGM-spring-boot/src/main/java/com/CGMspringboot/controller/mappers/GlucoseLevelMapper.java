package com.CGMspringboot.controller.mappers;

import com.CGMspringboot.controller.dto.request.GlucoseLevelRequestDTO;
import com.CGMspringboot.controller.dto.response.GlucoseLevelResponseDTO;
import com.CGMspringboot.domain.entity.GlucoseLevel;
import com.CGMspringboot.domain.entity.Patient;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GlucoseLevelMapper {

    public GlucoseLevel toGlucoseLevel(GlucoseLevelRequestDTO glucoseLevelRequestDTO){
        if (glucoseLevelRequestDTO == null) {
            return null;
        }
        GlucoseLevel glucoseLevel = new GlucoseLevel();
        Patient patient = new Patient();
        patient.setId(glucoseLevelRequestDTO.getPatientId());

        glucoseLevel.setPatient(patient);
        glucoseLevel.setTimeStamp(glucoseLevelRequestDTO.getTimeStamp());
        glucoseLevel.setGlucoseMgPerDl(glucoseLevelRequestDTO.getGlucoseMgPerDl());

        return glucoseLevel;
    }

    public GlucoseLevelResponseDTO toGlucoseLevelResponseDTO(GlucoseLevel glucoseLevel) {
        if (glucoseLevel == null) {
            return null;
        }

        GlucoseLevelResponseDTO glucoseLevelResponseDTO = new GlucoseLevelResponseDTO();

        glucoseLevelResponseDTO.setTimeStamp(glucoseLevel.getTimeStamp());
        glucoseLevelResponseDTO.setGlucoseMgPerDl(glucoseLevel.getGlucoseMgPerDl());
        return glucoseLevelResponseDTO;
    }

    public List<GlucoseLevelResponseDTO> toGlucoseLevelResponseDTOList(List<GlucoseLevel> glucoseLevel) {
        if (glucoseLevel == null) {
            return null;
        }

        List<GlucoseLevelResponseDTO> responseDTOList = new ArrayList<>();
        for(GlucoseLevel gl : glucoseLevel) {
            GlucoseLevelResponseDTO glucoseLevelResponseDTO = toGlucoseLevelResponseDTO(gl);
            responseDTOList.add(glucoseLevelResponseDTO);
        }
        return responseDTOList;
    }
}

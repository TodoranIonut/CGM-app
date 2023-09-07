package com.CGMspringboot.service.glucoseLevel;

import com.CGMspringboot.domain.entity.GlucoseLevel;
import com.CGMspringboot.exceptions.appUser.UserEmailNotFoundException;
import com.CGMspringboot.exceptions.appUser.UserIdNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

public interface GlucoseLevelService {

    GlucoseLevel saveGlucoseLevel(GlucoseLevel glucoseLevel) throws UserEmailNotFoundException, JsonProcessingException;
    List<GlucoseLevel> getGlucoseLevelByDate(Date date, String patientEmail);
    List<GlucoseLevel> getGlucoseLevelByTimestamp(String patientEmail, long startTimestamp, long endTimestamp);
    List<GlucoseLevel> getGlucoseLevelAfterStartTimestamp(String patientEmail, long startTimestamp);
}

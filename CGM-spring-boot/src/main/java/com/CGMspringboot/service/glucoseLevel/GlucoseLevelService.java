package com.CGMspringboot.service.glucoseLevel;

import com.CGMspringboot.domain.entity.GlucoseLevel;
import com.CGMspringboot.exceptions.appUser.UserIdNotFoundException;

import java.util.Date;
import java.util.List;

public interface GlucoseLevelService {

    GlucoseLevel saveGlucoseLevel(GlucoseLevel glucoseLevel) throws UserIdNotFoundException;
    List<GlucoseLevel> getGlucoseLevelByDate(Date date, Integer patientId);
}

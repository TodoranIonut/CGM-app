package com.CGMspringboot.service.glucoseLevel;

import com.CGMspringboot.domain.entity.GlucoseLevel;
import com.CGMspringboot.domain.repository.GlucoseLevelRepository;
import com.CGMspringboot.domain.repository.PatientRepository;
import com.CGMspringboot.exceptions.appUser.UserIdNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class GlucoseLevelServiceImpl implements GlucoseLevelService{

    private final GlucoseLevelRepository glucoseLevelRepository;
    private final PatientRepository patientRepository;

    @Override
    public GlucoseLevel saveGlucoseLevel(GlucoseLevel glucoseLevel) throws UserIdNotFoundException {
        Integer patientId = glucoseLevel.getPatient().getId();
        patientRepository.findById(patientId).orElseThrow(
                ()-> new UserIdNotFoundException(patientId));

        if(glucoseLevel.getTimeStamp() == 0){
            glucoseLevel.setTimeStamp(System.currentTimeMillis());
        }
        return glucoseLevelRepository.save(glucoseLevel);
    }

    @Override
    public List<GlucoseLevel> getGlucoseLevelByDate(Date date,Integer patientId) {

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        long startDate = calendar.getTimeInMillis();
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        long endDate = calendar.getTimeInMillis();

        List<GlucoseLevel> patientDailyGlucose = glucoseLevelRepository.findAllByPatientIdAndTimeStampBetween(patientId,startDate,endDate);
        return patientDailyGlucose;
    }
}
package com.CGMspringboot.domain.repository;

import com.CGMspringboot.domain.entity.GlucoseLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GlucoseLevelRepository extends JpaRepository<GlucoseLevel, Integer> {

    List<GlucoseLevel> findAllByPatientIdAndTimeStampBetween(Integer patientId, long startDateTimeStamp, long endDateTimeStamp);
}

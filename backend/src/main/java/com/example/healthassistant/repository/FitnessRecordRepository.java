package com.example.healthassistant.repository;

import com.example.healthassistant.model.FitnessRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FitnessRecordRepository extends JpaRepository<FitnessRecord, Long> {
    List<FitnessRecord> findByUserId(String userId);
    List<FitnessRecord> findByUserIdAndDate(String userId, LocalDate date);
    List<FitnessRecord> findByUserIdAndDateBetween(String userId, LocalDate startDate, LocalDate endDate);
}

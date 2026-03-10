package com.example.healthassistant.repository;

import com.example.healthassistant.model.DietRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DietRecordRepository extends JpaRepository<DietRecord, Long> {
    List<DietRecord> findByUserIdAndRecordedAtBetween(String userId, LocalDateTime start, LocalDateTime end);
    List<DietRecord> findByUserIdAndDateBetween(String userId, LocalDate startDate, LocalDate endDate);
    List<DietRecord> findByUserIdAndDate(String userId, LocalDate date);
}

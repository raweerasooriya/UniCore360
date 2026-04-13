package com.unicore360.unicore360_backend.repository;

import com.unicore360.unicore360_backend.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query(value = "SELECT * FROM notifications WHERE user_id = :userId ORDER BY created_at DESC", nativeQuery = true)
    List<Notification> findByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);

    List<Notification> findByUserIdAndIsReadFalse(Long userId);

    Long countByUserIdAndIsReadFalse(Long userId);
}
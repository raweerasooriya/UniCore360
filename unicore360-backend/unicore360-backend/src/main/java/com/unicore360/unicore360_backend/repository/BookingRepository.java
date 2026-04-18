package com.unicore360.unicore360_backend.repository;

import com.unicore360.unicore360_backend.model.Booking;
import com.unicore360.unicore360_backend.model.User;
import com.unicore360.unicore360_backend.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // 1. Existing functionality
    List<Booking> findByUserOrderByBookingDateDesc(User user);
    List<Booking> findAllByOrderByBookingDateDesc();

    // 2. MEMBER 2 CORE TASK: Conflict Checking Logic
    // This finds if any APPROVED or PENDING booking exists for the same resource, same day, and overlapping time.
    @Query("SELECT b FROM Booking b WHERE b.resource.id = :resId " +
            "AND b.bookingDate = :date " +
            "AND b.status != com.unicore360.unicore360_backend.model.BookingStatus.REJECTED " +
            "AND (:newStart < b.endTime AND :newEnd > b.startTime)")
    List<Booking> findOverlappingBookings(
            @Param("resId") Long resId,
            @Param("date") LocalDate date,
            @Param("newStart") LocalTime newStart,
            @Param("newEnd") LocalTime newEnd
    );

    // 3. Updated Analytics: Top 5 most booked resources
    @Query(value = "SELECT r.name as resourceName, COUNT(b.id) as bookingCount " +
            "FROM bookings b JOIN resources r ON b.resource_id = r.id " +
            "GROUP BY r.id ORDER BY bookingCount DESC LIMIT 5", nativeQuery = true)
    List<Map<String, Object>> findTopResources();

    // 4. Updated Analytics: Peak booking hours (Fixed to use the new startTime field)
    @Query(value = "SELECT HOUR(b.start_time) as hourSlot, COUNT(b.id) as bookingCount " +
            "FROM bookings b GROUP BY hourSlot ORDER BY bookingCount DESC", nativeQuery = true)
    List<Map<String, Object>> findPeakHours();
}
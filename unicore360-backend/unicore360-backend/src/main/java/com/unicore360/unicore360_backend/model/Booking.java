package com.unicore360.unicore360_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime; // Add this import

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "resource_id", nullable = false)
    private Resource resource;

    @Column(nullable = false)
    private LocalDate bookingDate;

    // --- CHANGE THESE TWO FOR CONFLICT CHECKING ---
    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;
    // ----------------------------------------------

    private String purpose;

    private Integer expectedAttendees;

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.PENDING;

    // Add this field so Admin can explain why they rejected a booking
    private String rejectionReason;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
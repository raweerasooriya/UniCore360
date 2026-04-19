package com.unicore360.unicore360_backend.controller;

import com.unicore360.unicore360_backend.model.Booking;
import com.unicore360.unicore360_backend.model.User;
import com.unicore360.unicore360_backend.service.BookingService;
import com.unicore360.unicore360_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final UserService userService;

    @GetMapping("/my")
    public List<Booking> getMyBookings(Principal principal) {
        String email = principal.getName();
        User user = userService.getUserByEmail(email);
        return bookingService.getUserBookings(user);
    }

    @PostMapping
    public ResponseEntity<?> createBooking(Principal principal,
                                           @RequestBody Map<String, Object> payload) {
        try {
            String email = principal.getName();
            User user = userService.getUserByEmail(email);

            // --- SAFER DATA EXTRACTION ---
            if (payload.get("resourceId") == null || payload.get("startTime") == null || payload.get("endTime") == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Missing required fields: resourceId, startTime, or endTime"));
            }

            Long resourceId = Long.valueOf(payload.get("resourceId").toString());
            LocalDate date = LocalDate.parse(payload.get("date").toString());
            LocalTime startTime = LocalTime.parse(payload.get("startTime").toString());
            LocalTime endTime = LocalTime.parse(payload.get("endTime").toString());

            String purpose = payload.get("purpose") != null ? payload.get("purpose").toString() : "";
            Integer attendees = payload.get("attendees") != null ? Integer.valueOf(payload.get("attendees").toString()) : 0;

            Booking booking = bookingService.createBooking(user, resourceId, date, startTime, endTime, purpose, attendees);
            return ResponseEntity.ok(booking);

        } catch (Exception e) {
            e.printStackTrace(); // This shows the error in IntelliJ console
            return ResponseEntity.badRequest().body(Map.of("message", "Booking failed: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(Principal principal,
                                           @PathVariable Long id) {
        String email = principal.getName();
        User user = userService.getUserByEmail(email);
        Booking cancelled = bookingService.cancelBooking(id, user);
        return ResponseEntity.ok(cancelled);
    }

    // --- ADMIN ENDPOINTS (Required for Member 2) ---

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Booking> approveBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.approveBooking(id));
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Booking> rejectBooking(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String reason = payload.get("reason");
        return ResponseEntity.ok(bookingService.rejectBooking(id, reason));
    }
}
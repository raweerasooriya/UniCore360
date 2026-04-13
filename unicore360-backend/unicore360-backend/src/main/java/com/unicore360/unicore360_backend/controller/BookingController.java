package com.unicore360.unicore360_backend.controller;

import com.unicore360.unicore360_backend.model.Booking;
import com.unicore360.unicore360_backend.model.User;
import com.unicore360.unicore360_backend.service.BookingService;
import com.unicore360.unicore360_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
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

            Long resourceId = Long.valueOf(payload.get("resourceId").toString());
            LocalDate date = LocalDate.parse(payload.get("date").toString());
            String timeRange = payload.get("timeRange").toString();
            String purpose = payload.get("purpose").toString();

            Integer attendees = payload.get("attendees") != null && !payload.get("attendees").toString().isEmpty()
                    ? Integer.valueOf(payload.get("attendees").toString())
                    : null;

            Booking booking = bookingService.createBooking(user, resourceId, date, timeRange, purpose, attendees);
            return ResponseEntity.ok(booking);

        } catch (Exception e) {
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
}
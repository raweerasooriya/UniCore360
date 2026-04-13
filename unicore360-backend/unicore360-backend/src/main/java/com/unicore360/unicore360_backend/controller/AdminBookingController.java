package com.unicore360.unicore360_backend.controller;

import com.unicore360.unicore360_backend.model.Booking;
import com.unicore360.unicore360_backend.repository.BookingRepository;
import com.unicore360.unicore360_backend.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/bookings")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminBookingController {

    private final BookingService bookingService;
    private final BookingRepository bookingRepository;  // added for delete

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveBooking(@PathVariable Long id) {
        Booking booking = bookingService.approveBooking(id);
        return ResponseEntity.ok(booking);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectBooking(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String reason = payload.get("reason");
        Booking booking = bookingService.rejectBooking(id, reason);
        return ResponseEntity.ok(booking);
    }

    // NEW: Delete a booking (admin only)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        bookingRepository.delete(booking);
        return ResponseEntity.ok().build();
    }
}
package com.unicore360.unicore360_backend.service;

import com.unicore360.unicore360_backend.model.*;
import com.unicore360.unicore360_backend.repository.BookingRepository;
import com.unicore360.unicore360_backend.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ResourceRepository resourceRepository;

    public List<Booking> getUserBookings(User user) {
        return bookingRepository.findByUserOrderByBookingDateDesc(user);
    }

    public Booking createBooking(User user, Long resourceId, LocalDate date, String timeRange, String purpose, Integer attendees) {
        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        // Check for conflicting bookings
        boolean conflict = bookingRepository.findAll().stream()
                .anyMatch(b -> b.getResource().getId().equals(resourceId)
                        && b.getBookingDate().equals(date)
                        && timeRangeOverlap(b.getTimeRange(), timeRange)
                        && b.getStatus() != BookingStatus.CANCELLED);
        if (conflict) {
            throw new RuntimeException("Time slot already booked for this resource");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setResource(resource);
        booking.setBookingDate(date);        // ✅ now exists
        booking.setTimeRange(timeRange);
        booking.setPurpose(purpose);
        booking.setExpectedAttendees(attendees);  // ✅ now exists
        booking.setStatus(BookingStatus.PENDING);
        return bookingRepository.save(booking);
    }

    public Booking cancelBooking(Long bookingId, User user) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (!booking.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You can only cancel your own bookings");
        }
        if (booking.getStatus() != BookingStatus.APPROVED && booking.getStatus() != BookingStatus.PENDING) {
            throw new RuntimeException("Booking cannot be cancelled in its current state");
        }
        booking.setStatus(BookingStatus.CANCELLED);
        return bookingRepository.save(booking);
    }

    // Get all bookings (for admin)
    public List<Booking> getAllBookings() {
        return bookingRepository.findAllByOrderByBookingDateDesc(); // define this method in repository
    }

    // Approve a booking
    public Booking approveBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new RuntimeException("Only pending bookings can be approved");
        }
        booking.setStatus(BookingStatus.APPROVED);
        return bookingRepository.save(booking);
    }

    // Reject a booking with reason
    public Booking rejectBooking(Long id, String reason) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new RuntimeException("Only pending bookings can be rejected");
        }
        booking.setStatus(BookingStatus.REJECTED);
        // Optional: add rejectionReason field to Booking entity and set it here
        return bookingRepository.save(booking);
    }
    private boolean timeRangeOverlap(String existing, String newRange) {
        try {
            String[] e = existing.split("-");
            String[] n = newRange.split("-");
            int eStart = Integer.parseInt(e[0].split(":")[0]) * 60 + Integer.parseInt(e[0].split(":")[1]);
            int eEnd = Integer.parseInt(e[1].split(":")[0]) * 60 + Integer.parseInt(e[1].split(":")[1]);
            int nStart = Integer.parseInt(n[0].split(":")[0]) * 60 + Integer.parseInt(n[0].split(":")[1]);
            int nEnd = Integer.parseInt(n[1].split(":")[0]) * 60 + Integer.parseInt(n[1].split(":")[1]);
            return (nStart < eEnd && nEnd > eStart);
        } catch (Exception ex) {
            return false;
        }
    }
}
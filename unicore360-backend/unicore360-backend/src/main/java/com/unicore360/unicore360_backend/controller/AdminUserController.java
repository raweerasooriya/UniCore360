package com.unicore360.unicore360_backend.controller;

import com.unicore360.unicore360_backend.model.Role;
import com.unicore360.unicore360_backend.model.User;
import com.unicore360.unicore360_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final UserRepository userRepository;

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Update user role
    @PutMapping("/{email}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable String email, @RequestBody RoleUpdateRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        user.setRole(request.getRole());
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
}

// Helper DTO
class RoleUpdateRequest {
    private Role role;
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
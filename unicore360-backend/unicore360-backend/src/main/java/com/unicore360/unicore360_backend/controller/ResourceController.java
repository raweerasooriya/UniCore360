package com.unicore360.unicore360_backend.controller;

import com.unicore360.unicore360_backend.model.Resource;
import com.unicore360.unicore360_backend.model.ResourceStatus;
import com.unicore360.unicore360_backend.service.ResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;

    // ==================== User endpoints (any authenticated user) ====================
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<Resource> getActiveResources() {
        // Return only ACTIVE resources for normal users
        return resourceService.getAllResources().stream()
                .filter(r -> r.getStatus() == ResourceStatus.ACTIVE)
                .collect(Collectors.toList());
    }

    // ==================== Admin endpoints (ADMIN only) ====================
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Resource> getAllResourcesForAdmin() {
        // Return all resources (including OUT_OF_SERVICE) for admin
        return resourceService.getAllResources();
    }

    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public Resource createResource(@RequestBody Resource resource) {
        return resourceService.createResource(resource);
    }

    @PutMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Resource updateResource(@PathVariable Long id, @RequestBody Resource resource) {
        return resourceService.updateResource(id, resource);
    }

    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.ok().build();
    }
}
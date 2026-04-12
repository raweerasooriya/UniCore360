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
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;

    @GetMapping("/resources")
    public List<Resource> getActiveResources() {
        return resourceService.getAllResources().stream()
                .filter(r -> r.getStatus() == ResourceStatus.ACTIVE)
                .collect(Collectors.toList());
    }

    @GetMapping("/admin/resources")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Resource> getAllResourcesForAdmin() {
        return resourceService.getAllResources();
    }

    @PostMapping("/admin/resources")
    @PreAuthorize("hasRole('ADMIN')")
    public Resource createResource(@RequestBody Resource resource) {
        return resourceService.createResource(resource);
    }

    @PutMapping("/admin/resources/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Resource updateResource(@PathVariable Long id, @RequestBody Resource resource) {
        return resourceService.updateResource(id, resource);
    }

    @DeleteMapping("/admin/resources/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.ok().build();
    }
}

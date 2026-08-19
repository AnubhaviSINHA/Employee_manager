package com.example.demo.controller;

import com.example.demo.dto.AuditLogDTO;
import com.example.demo.service.AuditLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
@CrossOrigin
public class AuditLogRestController {

    private final AuditLogService auditLogService;

    public AuditLogRestController(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
    }

    @GetMapping
    public ResponseEntity<List<AuditLogDTO>> getAllLogs() {
        return ResponseEntity.ok(auditLogService.getAllAuditLogs());
    }

    @GetMapping("/{entityName}/{entityId}")
    public ResponseEntity<List<AuditLogDTO>> getLogsForEntity(
            @PathVariable String entityName,
            @PathVariable String entityId) {
        return ResponseEntity.ok(auditLogService.getAuditLogsForEntity(entityName, entityId));
    }
}

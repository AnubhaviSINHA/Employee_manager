package com.example.demo.service;

import com.example.demo.dto.AuditLogDTO;
import java.util.List;

public interface AuditLogService {
    void logAction(String username, String action, String entityName, String entityId, String details);
    List<AuditLogDTO> getAllAuditLogs();
    List<AuditLogDTO> getAuditLogsForEntity(String entityName, String entityId);
}

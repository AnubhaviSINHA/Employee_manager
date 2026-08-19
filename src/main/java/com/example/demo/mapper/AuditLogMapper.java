package com.example.demo.mapper;

import com.example.demo.dto.AuditLogDTO;
import com.example.demo.entity.AuditLog;
import org.springframework.stereotype.Component;

@Component
public class AuditLogMapper {

    public AuditLogDTO toDTO(AuditLog entity) {
        if (entity == null) {
            return null;
        }

        AuditLogDTO dto = new AuditLogDTO();
        dto.setId(entity.getId());
        dto.setUsername(entity.getUsername());
        dto.setAction(entity.getAction());
        dto.setEntityName(entity.getEntityName());
        dto.setEntityId(entity.getEntityId());
        dto.setDetails(entity.getDetails());
        dto.setTimestamp(entity.getTimestamp());
        return dto;
    }
}

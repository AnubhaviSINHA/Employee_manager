package com.example.demo.mapper;

import com.example.demo.dto.DepartmentDTO;
import com.example.demo.entity.Department;
import org.springframework.stereotype.Component;

@Component
public class DepartmentMapper {

    public DepartmentDTO toDTO(Department entity) {
        if (entity == null) {
            return null;
        }

        int count = 0;
        if (entity.getEmployees() != null) {
            count = entity.getEmployees().size();
        }

        DepartmentDTO dto = new DepartmentDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setCode(entity.getCode());
        dto.setDescription(entity.getDescription());
        dto.setEmployeeCount(count);
        return dto;
    }

    public Department toEntity(DepartmentDTO dto) {
        if (dto == null) {
            return null;
        }

        Department entity = new Department();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setCode(dto.getCode());
        entity.setDescription(dto.getDescription());
        return entity;
    }

    public void updateEntityFromDTO(DepartmentDTO dto, Department entity) {
        if (dto == null || entity == null) {
            return;
        }

        entity.setName(dto.getName());
        entity.setCode(dto.getCode());
        entity.setDescription(dto.getDescription());
    }
}

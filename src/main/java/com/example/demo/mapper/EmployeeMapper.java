package com.example.demo.mapper;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.entity.Employee;
import com.example.demo.entity.Department;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper {

    public EmployeeDTO toDTO(Employee entity) {
        if (entity == null) {
            return null;
        }

        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(entity.getId());
        dto.setEmployeeId(entity.getEmployeeId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setEmail(entity.getEmail());
        dto.setMobile(entity.getMobile());
        if (entity.getDepartment() != null) {
            dto.setDepartmentId(entity.getDepartment().getId());
            dto.setDepartmentName(entity.getDepartment().getName());
        }
        dto.setDesignation(entity.getDesignation());
        dto.setSalary(entity.getSalary());
        dto.setDateOfJoining(entity.getDateOfJoining());
        dto.setAddress(entity.getAddress());
        dto.setCity(entity.getCity());
        dto.setState(entity.getState());
        dto.setCountry(entity.getCountry());
        dto.setPostalCode(entity.getPostalCode());
        dto.setGender(entity.getGender());
        dto.setDateOfBirth(entity.getDateOfBirth());
        dto.setEmergencyContact(entity.getEmergencyContact());
        dto.setBloodGroup(entity.getBloodGroup());
        dto.setSkills(entity.getSkills());
        dto.setYearsOfExperience(entity.getYearsOfExperience());
        dto.setEmploymentStatus(entity.getEmploymentStatus());
        dto.setProfilePicture(entity.getProfilePicture());
        dto.setResumePath(entity.getResumePath());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

    public Employee toEntity(EmployeeDTO dto, Department department) {
        if (dto == null) {
            return null;
        }

        Employee entity = new Employee();
        entity.setId(dto.getId());
        entity.setEmployeeId(dto.getEmployeeId());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setEmail(dto.getEmail());
        entity.setMobile(dto.getMobile());
        entity.setDepartment(department);
        entity.setDesignation(dto.getDesignation());
        entity.setSalary(dto.getSalary());
        entity.setDateOfJoining(dto.getDateOfJoining());
        entity.setAddress(dto.getAddress());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setCountry(dto.getCountry());
        entity.setPostalCode(dto.getPostalCode());
        entity.setGender(dto.getGender());
        entity.setDateOfBirth(dto.getDateOfBirth());
        entity.setEmergencyContact(dto.getEmergencyContact());
        entity.setBloodGroup(dto.getBloodGroup());
        entity.setSkills(dto.getSkills());
        entity.setYearsOfExperience(dto.getYearsOfExperience());
        entity.setEmploymentStatus(dto.getEmploymentStatus() != null ? dto.getEmploymentStatus() : "ACTIVE");
        entity.setProfilePicture(dto.getProfilePicture());
        entity.setResumePath(dto.getResumePath());
        return entity;
    }

    public void updateEntityFromDTO(EmployeeDTO dto, Employee entity, Department department) {
        if (dto == null || entity == null) {
            return;
        }

        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setEmail(dto.getEmail());
        entity.setMobile(dto.getMobile());
        entity.setDepartment(department);
        entity.setDesignation(dto.getDesignation());
        entity.setSalary(dto.getSalary());
        entity.setDateOfJoining(dto.getDateOfJoining());
        entity.setAddress(dto.getAddress());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setCountry(dto.getCountry());
        entity.setPostalCode(dto.getPostalCode());
        entity.setGender(dto.getGender());
        entity.setDateOfBirth(dto.getDateOfBirth());
        entity.setEmergencyContact(dto.getEmergencyContact());
        entity.setBloodGroup(dto.getBloodGroup());
        entity.setSkills(dto.getSkills());
        entity.setYearsOfExperience(dto.getYearsOfExperience());
        if (dto.getEmploymentStatus() != null) {
            entity.setEmploymentStatus(dto.getEmploymentStatus());
        }
        if (dto.getProfilePicture() != null) {
            entity.setProfilePicture(dto.getProfilePicture());
        }
        if (dto.getResumePath() != null) {
            entity.setResumePath(dto.getResumePath());
        }
    }
}

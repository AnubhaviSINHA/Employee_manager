package com.example.demo.service;

import com.example.demo.dto.DepartmentDTO;
import com.example.demo.entity.Department;
import com.example.demo.exception.DuplicateResourceException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.DepartmentMapper;
import com.example.demo.repository.DepartmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final DepartmentMapper departmentMapper;
    private final AuditLogService auditLogService;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository, 
                                 DepartmentMapper departmentMapper,
                                 AuditLogService auditLogService) {
        this.departmentRepository = departmentRepository;
        this.departmentMapper = departmentMapper;
        this.auditLogService = auditLogService;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(departmentMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DepartmentDTO getDepartmentById(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));
        return departmentMapper.toDTO(department);
    }

    @Override
    public DepartmentDTO createDepartment(DepartmentDTO dto) {
        if (departmentRepository.existsByName(dto.getName())) {
            throw new DuplicateResourceException("Department with name '" + dto.getName() + "' already exists");
        }
        if (departmentRepository.existsByCode(dto.getCode())) {
            throw new DuplicateResourceException("Department with code '" + dto.getCode() + "' already exists");
        }

        Department department = departmentMapper.toEntity(dto);
        Department saved = departmentRepository.save(department);

        auditLogService.logAction(
                "SYSTEM_USER",
                "CREATE",
                "Department",
                saved.getCode(),
                "Created department: " + saved.getName()
        );

        return departmentMapper.toDTO(saved);
    }

    @Override
    public DepartmentDTO updateDepartment(Long id, DepartmentDTO dto) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));

        departmentRepository.findByName(dto.getName()).ifPresent(d -> {
            if (!d.getId().equals(id)) {
                throw new DuplicateResourceException("Department with name '" + dto.getName() + "' already exists");
            }
        });

        departmentRepository.findByCode(dto.getCode()).ifPresent(d -> {
            if (!d.getId().equals(id)) {
                throw new DuplicateResourceException("Department with code '" + dto.getCode() + "' already exists");
            }
        });

        departmentMapper.updateEntityFromDTO(dto, department);
        Department updated = departmentRepository.save(department);

        auditLogService.logAction(
                "SYSTEM_USER",
                "UPDATE",
                "Department",
                updated.getCode(),
                "Updated department: " + updated.getName()
        );

        return departmentMapper.toDTO(updated);
    }

    @Override
    public void deleteDepartment(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));

        if (department.getEmployees() != null && !department.getEmployees().isEmpty()) {
            throw new IllegalStateException("Cannot delete department because it still has registered employees");
        }

        departmentRepository.delete(department);

        auditLogService.logAction(
                "SYSTEM_USER",
                "DELETE",
                "Department",
                department.getCode(),
                "Deleted department: " + department.getName()
        );
    }
}

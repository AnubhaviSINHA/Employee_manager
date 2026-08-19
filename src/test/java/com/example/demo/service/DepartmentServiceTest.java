package com.example.demo.service;

import com.example.demo.dto.DepartmentDTO;
import com.example.demo.entity.Department;
import com.example.demo.entity.Employee;
import com.example.demo.exception.DuplicateResourceException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.DepartmentMapper;
import com.example.demo.repository.DepartmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DepartmentServiceTest {

    @Mock
    private DepartmentRepository departmentRepository;

    @Mock
    private DepartmentMapper departmentMapper;

    @Mock
    private AuditLogService auditLogService;

    @InjectMocks
    private DepartmentServiceImpl departmentService;

    private Department department;
    private DepartmentDTO departmentDTO;

    @BeforeEach
    void setUp() {
        department = new Department(1L, "Engineering", "ENG", "Software Team");
        departmentDTO = new DepartmentDTO(1L, "Engineering", "ENG", "Software Team", 0);
    }

    @Test
    void getAllDepartments_ShouldReturnDepartmentList() {
        when(departmentRepository.findAll()).thenReturn(List.of(department));
        when(departmentMapper.toDTO(department)).thenReturn(departmentDTO);

        List<DepartmentDTO> result = departmentService.getAllDepartments();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Engineering", result.get(0).getName());
        verify(departmentRepository, times(1)).findAll();
    }

    @Test
    void getDepartmentById_WhenExists_ShouldReturnDepartment() {
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(departmentMapper.toDTO(department)).thenReturn(departmentDTO);

        DepartmentDTO result = departmentService.getDepartmentById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Engineering", result.getName());
    }

    @Test
    void getDepartmentById_WhenNotFound_ShouldThrowException() {
        when(departmentRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> departmentService.getDepartmentById(99L));
    }

    @Test
    void createDepartment_WhenValid_ShouldSaveAndReturn() {
        when(departmentRepository.existsByName("Engineering")).thenReturn(false);
        when(departmentRepository.existsByCode("ENG")).thenReturn(false);
        when(departmentMapper.toEntity(departmentDTO)).thenReturn(department);
        when(departmentRepository.save(any(Department.class))).thenReturn(department);
        when(departmentMapper.toDTO(department)).thenReturn(departmentDTO);

        DepartmentDTO result = departmentService.createDepartment(departmentDTO);

        assertNotNull(result);
        assertEquals("Engineering", result.getName());
        verify(departmentRepository, times(1)).save(any(Department.class));
    }

    @Test
    void createDepartment_WhenDuplicateName_ShouldThrowException() {
        when(departmentRepository.existsByName("Engineering")).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> departmentService.createDepartment(departmentDTO));
        verify(departmentRepository, never()).save(any(Department.class));
    }

    @Test
    void deleteDepartment_WhenHasEmployees_ShouldThrowException() {
        Employee employee = new Employee();
        employee.setId(10L);
        department.setEmployees(List.of(employee));

        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));

        assertThrows(IllegalStateException.class, () -> departmentService.deleteDepartment(1L));
        verify(departmentRepository, never()).delete(any(Department.class));
    }
}

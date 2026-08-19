package com.example.demo.service;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.entity.Department;
import com.example.demo.entity.Employee;
import com.example.demo.exception.DuplicateResourceException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.EmployeeMapper;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.EmployeeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private DepartmentRepository departmentRepository;

    @Mock
    private EmployeeMapper employeeMapper;

    @Mock
    private AuditLogService auditLogService;

    @Mock
    private FileStorageService fileStorageService;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    private Employee employee;
    private EmployeeDTO employeeDTO;
    private Department department;

    @BeforeEach
    void setUp() {
        department = new Department(1L, "Engineering", "ENG", "Software Team");

        employee = new Employee();
        employee.setId(1L);
        employee.setEmployeeId("EMP-001");
        employee.setFirstName("Alice");
        employee.setLastName("Smith");
        employee.setEmail("alice@example.com");
        employee.setMobile("9876543210");
        employee.setDepartment(department);
        employee.setDesignation("Software Engineer");
        employee.setSalary(85000.0);
        employee.setDateOfJoining(LocalDate.now());
        employee.setEmploymentStatus("ACTIVE");

        employeeDTO = new EmployeeDTO();
        employeeDTO.setId(1L);
        employeeDTO.setEmployeeId("EMP-001");
        employeeDTO.setFirstName("Alice");
        employeeDTO.setLastName("Smith");
        employeeDTO.setEmail("alice@example.com");
        employeeDTO.setMobile("9876543210");
        employeeDTO.setDepartmentId(1L);
        employeeDTO.setDesignation("Software Engineer");
        employeeDTO.setSalary(85000.0);
        employeeDTO.setDateOfJoining(LocalDate.now());
        employeeDTO.setEmploymentStatus("ACTIVE");
    }

    @Test
    void getAllEmployees_ShouldReturnList() {
        when(employeeRepository.findAll()).thenReturn(List.of(employee));
        when(employeeMapper.toDTO(employee)).thenReturn(employeeDTO);

        List<EmployeeDTO> result = employeeService.getAllEmployees();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("EMP-001", result.get(0).getEmployeeId());
    }

    @Test
    void getEmployeeById_WhenExists_ShouldReturnEmployee() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(employeeMapper.toDTO(employee)).thenReturn(employeeDTO);

        EmployeeDTO result = employeeService.getEmployeeById(1L);

        assertNotNull(result);
        assertEquals("EMP-001", result.getEmployeeId());
    }

    @Test
    void createEmployee_WhenValid_ShouldSaveAndReturn() {
        when(employeeRepository.existsByEmployeeId("EMP-001")).thenReturn(false);
        when(employeeRepository.existsByEmail("alice@example.com")).thenReturn(false);
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(employeeMapper.toEntity(employeeDTO, department)).thenReturn(employee);
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);
        when(employeeMapper.toDTO(employee)).thenReturn(employeeDTO);

        EmployeeDTO result = employeeService.createEmployee(employeeDTO);

        assertNotNull(result);
        assertEquals("EMP-001", result.getEmployeeId());
        verify(employeeRepository, times(1)).save(any(Employee.class));
    }

    @Test
    void createEmployee_WhenDuplicateEmail_ShouldThrowException() {
        when(employeeRepository.existsByEmployeeId("EMP-001")).thenReturn(false);
        when(employeeRepository.existsByEmail("alice@example.com")).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> employeeService.createEmployee(employeeDTO));
    }

    @Test
    void softDeleteEmployee_ShouldSetStatusInactive() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));

        employeeService.softDeleteEmployee(1L);

        assertEquals("INACTIVE", employee.getEmploymentStatus());
        verify(employeeRepository, times(1)).save(employee);
    }

    @Test
    void restoreEmployee_ShouldSetStatusActive() {
        employee.setEmploymentStatus("INACTIVE");
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(employeeRepository.save(employee)).thenReturn(employee);
        when(employeeMapper.toDTO(employee)).thenReturn(employeeDTO);

        EmployeeDTO result = employeeService.restoreEmployee(1L);

        assertNotNull(result);
        assertEquals("ACTIVE", employee.getEmploymentStatus());
        verify(employeeRepository, times(1)).save(employee);
    }
}

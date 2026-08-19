package com.example.demo.service;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.dto.PagedResponse;
import com.example.demo.entity.Department;
import com.example.demo.entity.Employee;
import com.example.demo.exception.DuplicateResourceException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.mapper.EmployeeMapper;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.specification.EmployeeSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final EmployeeMapper employeeMapper;
    private final AuditLogService auditLogService;
    private final FileStorageService fileStorageService;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, 
                               DepartmentRepository departmentRepository, 
                               EmployeeMapper employeeMapper,
                               AuditLogService auditLogService,
                               FileStorageService fileStorageService) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.employeeMapper = employeeMapper;
        this.auditLogService = auditLogService;
        this.fileStorageService = fileStorageService;
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(employeeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeDTO> getActiveEmployees() {
        return employeeRepository.findAll().stream()
                .filter(e -> !"INACTIVE".equalsIgnoreCase(e.getEmploymentStatus()))
                .map(employeeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeDTO> getInactiveEmployees() {
        return employeeRepository.findAll().stream()
                .filter(e -> "INACTIVE".equalsIgnoreCase(e.getEmploymentStatus()))
                .map(employeeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));
        return employeeMapper.toDTO(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeDTO getEmployeeByEmployeeId(String employeeId) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with Employee ID: " + employeeId));
        return employeeMapper.toDTO(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<EmployeeDTO> searchEmployees(
            String keyword,
            Long departmentId,
            String employmentStatus,
            String designation,
            String skills,
            Double minSalary,
            Double maxSalary,
            int page,
            int size,
            String sortBy,
            String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Employee> spec = EmployeeSpecification.getEmployeesByCriteria(
                keyword, departmentId, employmentStatus, designation, skills, minSalary, maxSalary
        );

        Page<Employee> employeePage = employeeRepository.findAll(spec, pageable);

        List<EmployeeDTO> content = employeePage.getContent().stream()
                .map(employeeMapper::toDTO)
                .collect(Collectors.toList());

        return new PagedResponse<>(
                content,
                employeePage.getNumber(),
                employeePage.getSize(),
                employeePage.getTotalElements(),
                employeePage.getTotalPages(),
                employeePage.isLast()
        );
    }

    @Override
    public EmployeeDTO createEmployee(EmployeeDTO dto) {
        if (employeeRepository.existsByEmployeeId(dto.getEmployeeId())) {
            throw new DuplicateResourceException("Employee ID '" + dto.getEmployeeId() + "' already exists");
        }
        if (employeeRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("Email '" + dto.getEmail() + "' is already registered");
        }

        Department department = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + dto.getDepartmentId()));

        Employee employee = employeeMapper.toEntity(dto, department);
        if (employee.getEmploymentStatus() == null) {
            employee.setEmploymentStatus("ACTIVE");
        }
        
        Employee saved = employeeRepository.save(employee);

        auditLogService.logAction(
                "SYSTEM_USER",
                "CREATE",
                "Employee",
                saved.getEmployeeId(),
                "Created employee: " + saved.getFirstName() + " " + saved.getLastName() + " in department " + department.getName()
        );

        return employeeMapper.toDTO(saved);
    }

    @Override
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO dto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));

        employeeRepository.findByEmail(dto.getEmail()).ifPresent(e -> {
            if (!e.getId().equals(id)) {
                throw new DuplicateResourceException("Email '" + dto.getEmail() + "' is already in use by another employee");
            }
        });

        Department newDepartment = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + dto.getDepartmentId()));

        StringBuilder changeLog = new StringBuilder();
        if (!Objects.equals(employee.getSalary(), dto.getSalary())) {
            changeLog.append(String.format("Salary changed from %.2f to %.2f. ", employee.getSalary(), dto.getSalary()));
        }
        if (!Objects.equals(employee.getDesignation(), dto.getDesignation())) {
            changeLog.append(String.format("Designation changed from '%s' to '%s'. ", employee.getDesignation(), dto.getDesignation()));
        }
        if (employee.getDepartment() != null && !Objects.equals(employee.getDepartment().getId(), newDepartment.getId())) {
            changeLog.append(String.format("Department changed from '%s' to '%s'. ", employee.getDepartment().getName(), newDepartment.getName()));
        }

        employeeMapper.updateEntityFromDTO(dto, employee, newDepartment);
        Employee updated = employeeRepository.save(employee);

        String details = changeLog.length() > 0 ? changeLog.toString() : "Updated profile details for " + updated.getEmployeeId();
        auditLogService.logAction("SYSTEM_USER", "UPDATE", "Employee", updated.getEmployeeId(), details);

        return employeeMapper.toDTO(updated);
    }

    @Override
    public EmployeeDTO uploadProfilePicture(Long id, MultipartFile file) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));

        String photoUrl = fileStorageService.storeFile(file, "profile-pictures");
        employee.setProfilePicture(photoUrl);
        Employee saved = employeeRepository.save(employee);

        auditLogService.logAction(
                "SYSTEM_USER",
                "UPDATE_PHOTO",
                "Employee",
                employee.getEmployeeId(),
                "Uploaded new profile picture: " + photoUrl
        );

        return employeeMapper.toDTO(saved);
    }

    @Override
    public EmployeeDTO uploadResume(Long id, MultipartFile file) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));

        String resumeUrl = fileStorageService.storeFile(file, "resumes");
        employee.setResumePath(resumeUrl);
        Employee saved = employeeRepository.save(employee);

        auditLogService.logAction(
                "SYSTEM_USER",
                "UPLOAD_RESUME",
                "Employee",
                employee.getEmployeeId(),
                "Uploaded new resume document: " + resumeUrl
        );

        return employeeMapper.toDTO(saved);
    }

    @Override
    public void softDeleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));

        employee.setEmploymentStatus("INACTIVE");
        employeeRepository.save(employee);

        auditLogService.logAction(
                "SYSTEM_USER",
                "SOFT_DELETE",
                "Employee",
                employee.getEmployeeId(),
                "Soft deleted (deactivated) employee: " + employee.getFirstName() + " " + employee.getLastName()
        );
    }

    @Override
    public EmployeeDTO restoreEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));

        employee.setEmploymentStatus("ACTIVE");
        Employee saved = employeeRepository.save(employee);

        auditLogService.logAction(
                "SYSTEM_USER",
                "RESTORE",
                "Employee",
                employee.getEmployeeId(),
                "Restored (reactivated) employee: " + employee.getFirstName() + " " + employee.getLastName()
        );

        return employeeMapper.toDTO(saved);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));

        employeeRepository.delete(employee);

        auditLogService.logAction(
                "SYSTEM_USER",
                "PERMANENT_DELETE",
                "Employee",
                employee.getEmployeeId(),
                "Permanently deleted employee: " + employee.getFirstName() + " " + employee.getLastName()
        );
    }
}

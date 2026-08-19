package com.example.demo.service;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.dto.PagedResponse;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface EmployeeService {
    List<EmployeeDTO> getAllEmployees();
    List<EmployeeDTO> getActiveEmployees();
    List<EmployeeDTO> getInactiveEmployees();
    EmployeeDTO getEmployeeById(Long id);
    EmployeeDTO getEmployeeByEmployeeId(String employeeId);
    
    PagedResponse<EmployeeDTO> searchEmployees(
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
            String sortDir
    );

    EmployeeDTO createEmployee(EmployeeDTO dto);
    EmployeeDTO updateEmployee(Long id, EmployeeDTO dto);
    EmployeeDTO uploadProfilePicture(Long id, MultipartFile file);
    EmployeeDTO uploadResume(Long id, MultipartFile file);
    void softDeleteEmployee(Long id);
    EmployeeDTO restoreEmployee(Long id);
    void deleteEmployee(Long id);
}

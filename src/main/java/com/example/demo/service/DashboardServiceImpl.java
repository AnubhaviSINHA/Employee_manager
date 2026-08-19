package com.example.demo.service;

import com.example.demo.dto.DashboardMetricsDTO;
import com.example.demo.entity.Employee;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    public DashboardServiceImpl(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }

    @Override
    public DashboardMetricsDTO getDashboardMetrics() {
        List<Employee> employees = employeeRepository.findAll();
        long totalDepartments = departmentRepository.count();

        long totalEmployees = employees.size();

        long inactiveEmployees = employees.stream()
                .filter(e -> "INACTIVE".equalsIgnoreCase(e.getEmploymentStatus()))
                .count();

        long activeEmployees = totalEmployees - inactiveEmployees;

        double averageSalary = employees.isEmpty() ? 0.0 : employees.stream()
                .filter(e -> e.getSalary() != null)
                .mapToDouble(Employee::getSalary)
                .average()
                .orElse(0.0);

        Map<String, Long> departmentDistribution = employees.stream()
                .collect(Collectors.groupingBy(
                        e -> e.getDepartment() != null ? e.getDepartment().getName() : "Unassigned",
                        Collectors.counting()
                ));

        Map<String, Long> designationDistribution = employees.stream()
                .collect(Collectors.groupingBy(
                        e -> e.getDesignation() != null ? e.getDesignation() : "Unspecified",
                        Collectors.counting()
                ));

        return new DashboardMetricsDTO(
                totalEmployees,
                activeEmployees,
                inactiveEmployees,
                totalDepartments,
                Math.round(averageSalary * 100.0) / 100.0,
                departmentDistribution,
                designationDistribution
        );
    }
}

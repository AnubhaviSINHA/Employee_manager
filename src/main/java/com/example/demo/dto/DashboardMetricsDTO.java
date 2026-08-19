package com.example.demo.dto;

import java.util.Map;

public class DashboardMetricsDTO {

    private long totalEmployees;
    private long activeEmployees;
    private long inactiveEmployees;
    private long totalDepartments;
    private double averageSalary;
    private Map<String, Long> departmentDistribution;
    private Map<String, Long> designationDistribution;

    public DashboardMetricsDTO() {
    }

    public DashboardMetricsDTO(long totalEmployees, long activeEmployees, long inactiveEmployees, long totalDepartments, double averageSalary, Map<String, Long> departmentDistribution, Map<String, Long> designationDistribution) {
        this.totalEmployees = totalEmployees;
        this.activeEmployees = activeEmployees;
        this.inactiveEmployees = inactiveEmployees;
        this.totalDepartments = totalDepartments;
        this.averageSalary = averageSalary;
        this.departmentDistribution = departmentDistribution;
        this.designationDistribution = designationDistribution;
    }

    public long getTotalEmployees() { return totalEmployees; }
    public void setTotalEmployees(long totalEmployees) { this.totalEmployees = totalEmployees; }

    public long getActiveEmployees() { return activeEmployees; }
    public void setActiveEmployees(long activeEmployees) { this.activeEmployees = activeEmployees; }

    public long getInactiveEmployees() { return inactiveEmployees; }
    public void setInactiveEmployees(long inactiveEmployees) { this.inactiveEmployees = inactiveEmployees; }

    public long getTotalDepartments() { return totalDepartments; }
    public void setTotalDepartments(long totalDepartments) { this.totalDepartments = totalDepartments; }

    public double getAverageSalary() { return averageSalary; }
    public void setAverageSalary(double averageSalary) { this.averageSalary = averageSalary; }

    public Map<String, Long> getDepartmentDistribution() { return departmentDistribution; }
    public void setDepartmentDistribution(Map<String, Long> departmentDistribution) { this.departmentDistribution = departmentDistribution; }

    public Map<String, Long> getDesignationDistribution() { return designationDistribution; }
    public void setDesignationDistribution(Map<String, Long> designationDistribution) { this.designationDistribution = designationDistribution; }
}

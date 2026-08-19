package com.example.demo.dto;

import jakarta.validation.constraints.*;

public class DepartmentDTO {

    private Long id;

    @NotBlank(message = "Department Name is required")
    @Size(min = 2, max = 50, message = "Department Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Department Code is required")
    @Size(min = 2, max = 10, message = "Department Code must be between 2 and 10 characters")
    @Pattern(regexp = "^[A-Z0-9-]+$", message = "Department Code must be uppercase alphanumeric or contain hyphens")
    private String code;

    private String description;
    private Integer employeeCount;

    public DepartmentDTO() {
    }

    public DepartmentDTO(Long id, String name, String code, String description, Integer employeeCount) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.description = description;
        this.employeeCount = employeeCount;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getEmployeeCount() { return employeeCount; }
    public void setEmployeeCount(Integer employeeCount) { this.employeeCount = employeeCount; }
}

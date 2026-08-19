package com.example.demo.controller;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.service.EmployeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EmployeeRestController.class)
@AutoConfigureMockMvc(addFilters = false)
class EmployeeRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmployeeService employeeService;

    private EmployeeDTO employeeDTO;

    @BeforeEach
    void setUp() {
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
    @WithMockUser
    void getAll_ShouldReturnEmployeeList() throws Exception {
        given(employeeService.getAllEmployees()).willReturn(List.of(employeeDTO));

        mockMvc.perform(get("/api/employees")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].employeeId").value("EMP-001"))
                .andExpect(jsonPath("$[0].firstName").value("Alice"));
    }

    @Test
    @WithMockUser
    void getById_WhenExists_ShouldReturnEmployee() throws Exception {
        given(employeeService.getEmployeeById(1L)).willReturn(employeeDTO);

        mockMvc.perform(get("/api/employees/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.employeeId").value("EMP-001"))
                .andExpect(jsonPath("$.email").value("alice@example.com"));
    }
}

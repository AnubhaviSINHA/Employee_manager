package com.example.demo.controller;

import com.example.demo.service.DashboardService;
import com.example.demo.service.DepartmentService;
import com.example.demo.service.EmployeeService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class WebViewController {

    private final EmployeeService employeeService;
    private final DepartmentService departmentService;
    private final DashboardService dashboardService;

    public WebViewController(EmployeeService employeeService, 
                              DepartmentService departmentService, 
                              DashboardService dashboardService) {
        this.employeeService = employeeService;
        this.departmentService = departmentService;
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public String index(Model model) {
        model.addAttribute("metrics", dashboardService.getDashboardMetrics());
        return "dashboard";
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("metrics", dashboardService.getDashboardMetrics());
        return "dashboard";
    }

    @GetMapping("/employees")
    public String employeeList(Model model) {
        model.addAttribute("employees", employeeService.getAllEmployees());
        model.addAttribute("departments", departmentService.getAllDepartments());
        return "employee-list";
    }
}

package com.example.demo.config;

import com.example.demo.entity.Department;
import com.example.demo.entity.Employee;
import com.example.demo.entity.UserAccount;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.UserAccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserAccountRepository userAccountRepository;
    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserAccountRepository userAccountRepository,
                           DepartmentRepository departmentRepository,
                           EmployeeRepository employeeRepository,
                           PasswordEncoder passwordEncoder) {
        this.userAccountRepository = userAccountRepository;
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedDepartmentsAndEmployees();
    }

    private void seedUsers() {
        if (userAccountRepository.count() == 0) {
            UserAccount admin = new UserAccount(
                    "admin",
                    passwordEncoder.encode("admin123"),
                    true,
                    Set.of("ROLE_ADMIN", "ROLE_MANAGER", "ROLE_EMPLOYEE")
            );

            UserAccount manager = new UserAccount(
                    "manager",
                    passwordEncoder.encode("manager123"),
                    true,
                    Set.of("ROLE_MANAGER", "ROLE_EMPLOYEE")
            );

            UserAccount employee = new UserAccount(
                    "employee",
                    passwordEncoder.encode("employee123"),
                    true,
                    Set.of("ROLE_EMPLOYEE")
            );

            userAccountRepository.saveAll(List.of(admin, manager, employee));
        }
    }

    private void seedDepartmentsAndEmployees() {
        if (departmentRepository.count() == 0) {
            Department eng = departmentRepository.save(new Department(null, "Engineering", "ENG", "Software Development & IT Infrastructure"));
            Department hr = departmentRepository.save(new Department(null, "Human Resources", "HR", "Talent Acquisition & Employee Operations"));
            Department fin = departmentRepository.save(new Department(null, "Finance", "FIN", "Financial Operations & Accounting"));
            Department mkt = departmentRepository.save(new Department(null, "Marketing", "MKT", "Brand Growth & Digital Marketing"));

            if (employeeRepository.count() == 0) {
                Employee emp1 = new Employee();
                emp1.setEmployeeId("EMP-001");
                emp1.setFirstName("Alice");
                emp1.setLastName("Smith");
                emp1.setEmail("alice.smith@ems.com");
                emp1.setMobile("9876543210");
                emp1.setDepartment(eng);
                emp1.setDesignation("Senior Software Engineer");
                emp1.setSalary(95000.00);
                emp1.setDateOfJoining(LocalDate.of(2022, 3, 15));
                emp1.setEmploymentStatus("ACTIVE");
                emp1.setSkills("Java, Spring Boot, MySQL, React");

                Employee emp2 = new Employee();
                emp2.setEmployeeId("EMP-002");
                emp2.setFirstName("Bob");
                emp2.setLastName("Johnson");
                emp2.setEmail("bob.johnson@ems.com");
                emp2.setMobile("9876543211");
                emp2.setDepartment(hr);
                emp2.setDesignation("HR Specialist");
                emp2.setSalary(65000.00);
                emp2.setDateOfJoining(LocalDate.of(2023, 1, 10));
                emp2.setEmploymentStatus("ACTIVE");
                emp2.setSkills("Recruitment, Employee Relations, Payroll");

                Employee emp3 = new Employee();
                emp3.setEmployeeId("EMP-003");
                emp3.setFirstName("Charlie");
                emp3.setLastName("Brown");
                emp3.setEmail("charlie.brown@ems.com");
                emp3.setMobile("9876543212");
                emp3.setDepartment(fin);
                emp3.setDesignation("Financial Analyst");
                emp3.setSalary(78000.00);
                emp3.setDateOfJoining(LocalDate.of(2021, 6, 20));
                emp3.setEmploymentStatus("ACTIVE");
                emp3.setSkills("Financial Planning, Excel, Auditing");

                employeeRepository.saveAll(List.of(emp1, emp2, emp3));
            }
        }
    }
}

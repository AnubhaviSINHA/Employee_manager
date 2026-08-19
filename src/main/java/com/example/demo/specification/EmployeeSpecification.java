package com.example.demo.specification;

import com.example.demo.entity.Employee;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class EmployeeSpecification {

    public static Specification<Employee> getEmployeesByCriteria(
            String keyword,
            Long departmentId,
            String employmentStatus,
            String designation,
            String skills,
            Double minSalary,
            Double maxSalary) {

        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Global search keyword across name, email, employeeId
            if (keyword != null && !keyword.trim().isEmpty()) {
                String searchPattern = "%" + keyword.trim().toLowerCase() + "%";
                Predicate firstNameMatch = criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), searchPattern);
                Predicate lastNameMatch = criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), searchPattern);
                Predicate emailMatch = criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), searchPattern);
                Predicate employeeIdMatch = criteriaBuilder.like(criteriaBuilder.lower(root.get("employeeId")), searchPattern);

                predicates.add(criteriaBuilder.or(firstNameMatch, lastNameMatch, emailMatch, employeeIdMatch));
            }

            // Department filter
            if (departmentId != null) {
                predicates.add(criteriaBuilder.equal(root.get("department").get("id"), departmentId));
            }

            // Employment Status filter
            if (employmentStatus != null && !employmentStatus.trim().isEmpty()) {
                predicates.add(criteriaBuilder.equal(criteriaBuilder.lower(root.get("employmentStatus")), employmentStatus.trim().toLowerCase()));
            }

            // Designation filter
            if (designation != null && !designation.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("designation")), "%" + designation.trim().toLowerCase() + "%"));
            }

            // Skills filter
            if (skills != null && !skills.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("skills")), "%" + skills.trim().toLowerCase() + "%"));
            }

            // Salary range filter
            if (minSalary != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("salary"), minSalary));
            }
            if (maxSalary != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("salary"), maxSalary));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}

package com.example.demo.service;

import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class ReportExportServiceImpl implements ReportExportService {

    private final EmployeeRepository employeeRepository;

    public ReportExportServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public ByteArrayInputStream exportEmployeesToCsv() {
        List<Employee> employees = employeeRepository.findAll();

        CSVFormat format = CSVFormat.DEFAULT.builder()
                .setHeader("ID", "Employee ID", "First Name", "Last Name", "Email", "Mobile", "Department", "Designation", "Salary", "Status", "Date of Joining")
                .build();

        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
             CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format)) {

            for (Employee emp : employees) {
                List<String> data = Arrays.asList(
                        String.valueOf(emp.getId()),
                        emp.getEmployeeId() != null ? emp.getEmployeeId() : "",
                        emp.getFirstName() != null ? emp.getFirstName() : "",
                        emp.getLastName() != null ? emp.getLastName() : "",
                        emp.getEmail() != null ? emp.getEmail() : "",
                        emp.getMobile() != null ? emp.getMobile() : "",
                        emp.getDepartment() != null ? emp.getDepartment().getName() : "Unassigned",
                        emp.getDesignation() != null ? emp.getDesignation() : "",
                        emp.getSalary() != null ? String.format("%.2f", emp.getSalary()) : "0.00",
                        emp.getEmploymentStatus() != null ? emp.getEmploymentStatus() : "ACTIVE",
                        emp.getDateOfJoining() != null ? emp.getDateOfJoining().toString() : ""
                );
                csvPrinter.printRecord(data);
            }

            csvPrinter.flush();
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("Failed to export CSV data: " + e.getMessage(), e);
        }
    }

    @Override
    public ByteArrayInputStream exportEmployeesToExcel() {
        List<Employee> employees = employeeRepository.findAll();

        String[] HEADERs = {"ID", "Employee ID", "First Name", "Last Name", "Email", "Mobile", "Department", "Designation", "Salary", "Status", "Date of Joining"};

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Employees");

            // Header Row Styling
            Row headerRow = sheet.createRow(0);
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            Font font = workbook.createFont();
            font.setColor(IndexedColors.WHITE.getIndex());
            font.setBold(true);
            headerCellStyle.setFont(font);

            for (int col = 0; col < HEADERs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs[col]);
                cell.setCellStyle(headerCellStyle);
            }

            // Data Rows
            int rowIdx = 1;
            for (Employee emp : employees) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(emp.getId());
                row.createCell(1).setCellValue(emp.getEmployeeId() != null ? emp.getEmployeeId() : "");
                row.createCell(2).setCellValue(emp.getFirstName() != null ? emp.getFirstName() : "");
                row.createCell(3).setCellValue(emp.getLastName() != null ? emp.getLastName() : "");
                row.createCell(4).setCellValue(emp.getEmail() != null ? emp.getEmail() : "");
                row.createCell(5).setCellValue(emp.getMobile() != null ? emp.getMobile() : "");
                row.createCell(6).setCellValue(emp.getDepartment() != null ? emp.getDepartment().getName() : "Unassigned");
                row.createCell(7).setCellValue(emp.getDesignation() != null ? emp.getDesignation() : "");
                row.createCell(8).setCellValue(emp.getSalary() != null ? emp.getSalary() : 0.0);
                row.createCell(9).setCellValue(emp.getEmploymentStatus() != null ? emp.getEmploymentStatus() : "ACTIVE");
                row.createCell(10).setCellValue(emp.getDateOfJoining() != null ? emp.getDateOfJoining().toString() : "");
            }

            // Auto-size columns
            for (int col = 0; col < HEADERs.length; col++) {
                sheet.autoSizeColumn(col);
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("Failed to export Excel data: " + e.getMessage(), e);
        }
    }
}

package com.example.demo.controller;

import com.example.demo.service.ReportExportService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin
public class ReportRestController {

    private final ReportExportService reportExportService;

    public ReportRestController(ReportExportService reportExportService) {
        this.reportExportService = reportExportService;
    }

    @GetMapping("/employees/csv")
    public ResponseEntity<Resource> exportCsv() {
        String filename = "employees_report.csv";
        ByteArrayInputStream in = reportExportService.exportEmployeesToCsv();
        InputStreamResource file = new InputStreamResource(in);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(file);
    }

    @GetMapping("/employees/excel")
    public ResponseEntity<Resource> exportExcel() {
        String filename = "employees_report.xlsx";
        ByteArrayInputStream in = reportExportService.exportEmployeesToExcel();
        InputStreamResource file = new InputStreamResource(in);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }
}

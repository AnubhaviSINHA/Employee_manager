package com.example.demo.service;

import java.io.ByteArrayInputStream;

public interface ReportExportService {
    ByteArrayInputStream exportEmployeesToCsv();
    ByteArrayInputStream exportEmployeesToExcel();
}

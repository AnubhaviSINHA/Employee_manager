@echo off
echo ========================================================
echo   Starting Enterprise Employee Management System (EMS)
echo ========================================================
echo.
echo [1/2] Launching Spring Boot Backend (Port 8080)...
start "EMS Backend (Spring Boot)" powershell -NoExit -Command "cd '%~dp0'; .\mvnw spring-boot:run"

echo [2/2] Launching React SaaS Frontend (Port 5173)...
start "EMS Frontend (React + Vite)" powershell -NoExit -Command "cd '%~dp0frontend'; npm run dev"

echo.
echo ========================================================
echo Both servers launched in separate windows!
echo - Web Application: http://localhost:5173
echo - Swagger API:      http://localhost:8080/swagger-ui.html
echo ========================================================
echo.
pause

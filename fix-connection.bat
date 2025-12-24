@echo off
echo ========================================
echo   CONNECTION TROUBLESHOOTING
echo ========================================
echo.

echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found!
    echo Please install Python from: https://www.python.org/downloads/
    echo.
    pause
    exit
) else (
    echo [OK] Python is installed
    python --version
)
echo.

echo Checking your IP address...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set IP=%%a
    set IP=!IP: =!
    echo Your IP Address: !IP!
    echo.
    echo Mobile URL: http://!IP!:8000
    echo.
)
echo.

echo Checking if port 8000 is in use...
netstat -an | findstr :8000 >nul
if errorlevel 1 (
    echo [INFO] Port 8000 is available
    echo.
    echo Starting server on port 8000...
    echo.
    echo ========================================
    echo   SERVER STARTING
    echo ========================================
    echo.
    echo Your website will be available at:
    echo   - Computer: http://localhost:8000
    echo   - Mobile:   http://!IP!:8000
    echo.
    echo Make sure mobile is on SAME WiFi network!
    echo.
    echo Press Ctrl+C to stop the server
    echo ========================================
    echo.
    python -m http.server 8000
) else (
    echo [WARNING] Port 8000 is already in use!
    echo.
    echo Another server might be running.
    echo Try a different port:
    echo   python -m http.server 8001
    echo.
    pause
)


@echo off
echo Starting Local Web Server...
echo.
echo Your website will be available at:
echo.
echo On this computer: http://localhost:8000
echo.
echo On mobile (same WiFi):
echo 1. Find your computer's IP address below
echo 2. Open http://YOUR_IP:8000 on your mobile browser
echo.
echo Press Ctrl+C to stop the server
echo.
echo ====================================

REM Try Python 3 first
python -m http.server 8000 2>nul
if errorlevel 1 (
    REM Try Python 2
    python -m SimpleHTTPServer 8000 2>nul
    if errorlevel 1 (
        echo Python not found. Trying Node.js...
        npx http-server -p 8000
    )
)

pause


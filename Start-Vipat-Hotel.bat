@echo off
echo ===================================================
echo   Starting Vipat Hotel Management System...
echo ===================================================
echo.
echo [1/2] Installing dependencies (First time only)...
call npm install
echo.
echo [2/2] Launching Application...
echo.
echo Please wait... The browser will open shortly.
echo.
call npm run dev
pause

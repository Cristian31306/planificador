@echo off
echo ==============================================
echo   Deteniendo los servidores del Planificador
echo ==============================================
echo.

echo Cerrando procesos de Node (Backend y Frontend)...
taskkill /F /IM node.exe

echo.
echo ¡Servidores detenidos exitosamente!
echo.
pause

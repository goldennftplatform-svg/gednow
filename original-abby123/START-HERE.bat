@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Rumi's Alphabet Stage - Server

echo.
echo  ============================================
echo   RUMI'S ALPHABET STAGE
echo  ============================================
echo.

where python >nul 2>nul
if %errorlevel%==0 goto :run_python

where py >nul 2>nul
if %errorlevel%==0 goto :run_py

where node >nul 2>nul
if %errorlevel%==0 goto :run_node

echo  Python or Node.js was not found.
echo  Install Python from https://www.python.org/downloads/
echo  and run this file again.
pause
exit /b 1

:run_python
python server.py
goto :done

:run_py
py -3 server.py
goto :done

:run_node
node server.js
goto :done

:done
pause

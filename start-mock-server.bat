@echo off
REM Script pour démarrer le serveur mock

REM Vérifie si Node.js est installé
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js n'est pas installé. Veuillez l'installer avant de continuer.
    exit /b 1
)

REM Démarre le serveur mock
node mock-server.mjs
if %errorlevel% neq 0 (
    echo Une erreur s'est produite lors du démarrage du serveur mock.
    exit /b 1
)

echo Serveur mock démarré avec succès.
pause
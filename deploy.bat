@echo off
echo ========================================
echo MF Leaderboard - GitHub Pages Deployment
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing git repository...
    git init
    echo Git initialized successfully!
) else (
    echo Git already initialized
)

echo.
set /p username="Enter your GitHub username: "

if "%username%"=="" (
    echo Error: Username cannot be empty
    pause
    exit /b 1
)

REM Remove existing remote if exists
git remote remove origin 2>nul

REM Add remote
echo Adding GitHub remote...
git remote add origin https://github.com/%username%/realtime-MF.git
echo Remote added successfully!

REM Add files
echo.
echo Adding files...
git add .
echo Files added!

REM Commit
echo.
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=MF Leaderboard - Real-time updates

echo Committing changes...
git commit -m "%commit_msg%"
echo Changes committed!

REM Push to GitHub
echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if %errorlevel%==0 (
    echo.
    echo ========================================
    echo Successfully pushed to GitHub!
    echo ========================================
    echo.
    echo Next Steps:
    echo 1. Go to: https://github.com/%username%/realtime-MF/settings/pages
    echo 2. Under 'Source', select 'GitHub Actions'
    echo 3. Wait 2-3 minutes for deployment
    echo 4. Visit: https://%username%.github.io/realtime-MF/
    echo.
    echo Your website will be live soon!
) else (
    echo.
    echo Error: Failed to push to GitHub
    echo Please check:
    echo 1. Repository exists: https://github.com/%username%/realtime-MF
    echo 2. You have access to the repository
    echo 3. Your GitHub credentials are correct
)

echo.
pause

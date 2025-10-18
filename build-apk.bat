@echo off
echo ========================================
echo 车机音乐播放器 APK 构建脚本
echo ========================================

echo 1. 检查环境...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到 Node.js，请先安装 Node.js
    echo 请访问 https://nodejs.org 下载安装
    pause
    exit /b 1
)

echo Node.js 已安装
node --version

echo 2. 检查Cordova...
where cordova >nul 2>nul
if %errorlevel% neq 0 (
    echo 正在安装 Cordova CLI...
    call npm install -g cordova
    if %errorlevel% neq 0 (
        echo 错误: Cordova 安装失败
        pause
        exit /b 1
    )
)

echo Cordova 已安装
cordova --version

echo 3. 初始化Cordova项目...
if not exist "platforms" (
    echo 添加Android平台...
    call cordova platform add android
    if %errorlevel% neq 0 (
        echo 错误: Android平台添加失败
        pause
        exit /b 1
    )
)

echo 4. 构建APK...
echo 选择构建方式:
echo [1] 调试版本 (Debug APK)
echo [2] 发布版本 (Release APK)
set /p choice="请选择 (1 或 2): "

if "%choice%"=="2" (
    echo 构建发布版本...
    call cordova build android --release
    if %errorlevel% equ 0 (
        echo ========================================
        echo 构建成功！
        echo APK文件位置: platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk
        echo 注意: 发布版本需要签名才能安装
        echo ========================================
    ) else (
        echo 构建失败，尝试调试版本...
        call cordova build android
    )
) else (
    echo 构建调试版本...
    call cordova build android
    if %errorlevel% equ 0 (
        echo ========================================
        echo 构建成功！
        echo APK文件位置: platforms\android\app\build\outputs\apk\debug\app-debug.apk
        echo 调试版本可以直接安装到设备
        echo ========================================
    ) else (
        echo ========================================
        echo 构建失败，请检查错误信息
        echo ========================================
    )
)

echo 5. 打开输出目录...
if exist "platforms\android\app\build\outputs\apk" (
    explorer platforms\android\app\build\outputs\apk
)

pause
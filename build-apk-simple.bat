@echo off
echo ========================================
echo 车机音乐播放器 简化APK构建脚本
echo ========================================

echo 正在准备Cordova项目...

REM 创建临时构建目录
if exist "cordova-build" rmdir /s /q "cordova-build"
mkdir cordova-build
cd cordova-build

echo 初始化Cordova项目...
call cordova create . com.carmusic.player "车机音乐"

echo 复制项目文件...
copy ..\*.html www\ /Y
copy ..\*.js www\ /Y
copy ..\*.css www\ /Y
if exist "..\assets" xcopy ..\assets www\assets\ /E /I /Y

echo 复制配置文件...
copy ..\config.xml . /Y

echo 添加Android平台...
call cordova platform add android

echo ========================================
echo 环境检查完成！
echo 
echo 要完成APK构建，你需要：
echo 1. 安装 Java JDK (推荐版本 8-17)
echo 2. 安装 Android Studio 或 Android SDK
echo 3. 设置环境变量 ANDROID_HOME
echo 
echo 或者使用以下在线构建服务：
echo - PhoneGap Build (已停止服务)
echo - Ionic Appflow
echo - 或使用 GitHub Actions 自动构建
echo ========================================

pause
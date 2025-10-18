@echo off
echo ========================================
echo 上传到GitHub仓库
echo ========================================

echo 检查Git是否已安装...
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo Git未安装，正在打开下载页面...
    start https://git-scm.com/download/win
    echo.
    echo 请下载并安装Git，然后重新运行此脚本
    pause
    exit /b 1
)

echo Git已安装，版本信息：
git --version
echo.

echo 初始化Git仓库...
git init

echo 添加所有文件...
git add .

echo 提交代码...
git commit -m "初始提交：车机音乐播放器"

echo 设置主分支...
git branch -M main

echo 添加远程仓库...
git remote add origin https://github.com/bwd520/car-music-player.git

echo 推送到GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo ========================================
    echo 上传成功！
    echo 
    echo 仓库地址: https://github.com/bwd520/car-music-player
    echo 
    echo 自动构建已开始，请访问以下链接查看进度：
    echo https://github.com/bwd520/car-music-player/actions
    echo 
    echo 构建完成后，在Actions页面下载APK文件
    echo ========================================
    start https://github.com/bwd520/car-music-player/actions
) else (
    echo ========================================
    echo 上传失败，请检查网络连接和仓库权限
    echo ========================================
)

pause
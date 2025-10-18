@echo off
echo ========================================
echo GitHub 仓库设置助手
echo ========================================

echo 请按照以下步骤设置GitHub自动构建：
echo.
echo 1. 在GitHub上创建新仓库
echo    - 访问: https://github.com/new
echo    - 仓库名建议: car-music-player
echo    - 设为公开仓库（Private也可以）
echo    - 不要初始化README、.gitignore或LICENSE
echo.
echo 2. 在本地初始化Git仓库
echo    执行以下命令：
echo.
echo    git init
echo    git add .
echo    git commit -m "初始提交：车机音乐播放器"
echo    git branch -M main
echo    git remote add origin https://github.com/你的用户名/你的仓库名.git
echo    git push -u origin main
echo.
echo 3. 等待自动构建
echo    - 推送后GitHub Actions会自动开始构建
echo    - 构建时间约5-10分钟
echo    - 在仓库的Actions页面可以查看进度
echo.
echo 4. 下载APK
echo    - 构建完成后在Actions页面下载Artifacts
echo    - 选择 car-music-debug-apk 下载调试版本
echo.
echo ========================================
echo 提示：如果你还没有安装Git，请先下载安装：
echo https://git-scm.com/download/win
echo ========================================

pause
# 车机音乐播放器

专为车机设计的音乐播放器应用，支持横屏显示和大按钮操作。

## 🚀 快速开始 - GitHub Actions 自动构建APK

### 1. 上传到GitHub
1. 在GitHub上创建新仓库
2. 将整个 `music` 文件夹内容上传到仓库根目录
3. 确保包含 `.github/workflows/build-android.yml` 文件

### 2. 触发构建
有三种方式触发APK构建：

#### 方式1：推送代码（自动触发）
```bash
git add .
git commit -m "添加车机音乐播放器"
git push origin main
```

#### 方式2：手动触发
1. 进入GitHub仓库页面
2. 点击 "Actions" 标签
3. 选择 "Build Android APK" 工作流
4. 点击 "Run workflow" 按钮

#### 方式3：创建Pull Request
创建PR时也会自动触发构建

### 3. 下载APK
构建完成后（大约5-10分钟）：

1. 进入GitHub仓库的 "Actions" 页面
2. 点击最新的构建记录
3. 在 "Artifacts" 部分下载：
   - `car-music-debug-apk` - 调试版本（可直接安装）
   - `car-music-release-apk` - 发布版本（需要签名）

## 📱 安装APK

### 调试版本（推荐）
- 下载 `car-music-debug-apk`
- 解压得到 `app-debug.apk`
- 直接安装到Android设备

### 发布版本
- 下载 `car-music-release-apk` 
- 解压得到 `app-release-unsigned.apk`
- 需要签名后才能安装

## 🔧 本地开发

如果你想在本地修改和测试：

```bash
# 启动开发服务器
python server.py

# 在浏览器中打开
http://localhost:8000
```

## 📁 项目结构

```
music/
├── .github/workflows/
│   └── build-android.yml     # GitHub Actions构建配置
├── assets/                   # 资源文件
├── src/                      # 源代码
├── index.html               # 主页面
├── app.js                   # 主要逻辑
├── styles.css               # 样式文件
├── config.xml               # Cordova配置
└── README.md                # 说明文档
```

## 🎯 功能特性

- 🎵 支持多种音频格式
- 📱 车机横屏适配
- 🎛️ 大按钮设计，方便操作
- 🔊 音量控制
- ⏯️ 播放控制（播放/暂停/上一首/下一首）
- 📋 播放列表管理

## 🛠️ 构建状态

[![Build Android APK](https://github.com/你的用户名/你的仓库名/actions/workflows/build-android.yml/badge.svg)](https://github.com/你的用户名/你的仓库名/actions/workflows/build-android.yml)

## 📝 更新日志

### v1.0.0
- 初始版本
- 基础音乐播放功能
- 车机界面适配
- GitHub Actions自动构建

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License
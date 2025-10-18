# 车机音乐播放器 APK 构建指南

## 方案1：本地构建（推荐）

### 1. 安装必要软件

#### 安装 Java JDK
1. 下载 Java JDK 11 或 17：https://adoptium.net/
2. 安装后设置环境变量：
   - `JAVA_HOME` = JDK安装路径
   - 将 `%JAVA_HOME%\bin` 添加到 `PATH`

#### 安装 Android Studio
1. 下载：https://developer.android.com/studio
2. 安装时选择包含 Android SDK
3. 设置环境变量：
   - `ANDROID_HOME` = SDK路径 (通常在 `%LOCALAPPDATA%\Android\Sdk`)
   - 将以下路径添加到 `PATH`：
     - `%ANDROID_HOME%\tools`
     - `%ANDROID_HOME%\platform-tools`
     - `%ANDROID_HOME%\build-tools\最新版本号`

### 2. 验证安装
```cmd
java -version
cordova requirements android
```

### 3. 构建APK
运行构建脚本：
```cmd
build-apk.bat
```

## 方案2：GitHub Actions 自动构建

### 1. 上传代码到GitHub
1. 创建GitHub仓库
2. 上传项目文件
3. 确保包含 `.github/workflows/build-android.yml` 文件

### 2. 触发构建
- 推送代码到main分支
- 或在GitHub仓库页面手动触发 "Build Android APK" 工作流

### 3. 下载APK
构建完成后，在GitHub Actions页面下载生成的APK文件

## 方案3：使用在线服务

### Ionic Appflow
1. 注册：https://ionic.io/appflow
2. 连接GitHub仓库
3. 配置构建设置
4. 触发构建

## 故障排除

### 常见错误
1. **ANDROID_HOME未设置**
   - 确保正确设置Android SDK路径

2. **Java版本不兼容**
   - 使用Java 8-17版本

3. **构建工具版本问题**
   - 更新Android SDK Build Tools

4. **插件兼容性问题**
   - 检查config.xml中的插件版本

### 检查命令
```cmd
echo %JAVA_HOME%
echo %ANDROID_HOME%
cordova requirements android
```

## 输出文件位置

构建成功后，APK文件位于：
- 调试版本：`platforms/android/app/build/outputs/apk/debug/app-debug.apk`
- 发布版本：`platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk`

## 签名APK（发布用）

发布版本需要签名：
1. 生成密钥库：`keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000`
2. 签名APK：`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name`
3. 优化APK：`zipalign -v 4 app-release-unsigned.apk app-release.apk`
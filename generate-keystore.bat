@echo off
echo 正在生成Android签名密钥...
cd android\app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000 -storepass android -keypass android -dname "CN=CarMusic, OU=Development, O=CarMusic, L=City, S=State, C=CN"
echo 密钥生成完成！
echo 密钥文件位置: android\app\my-release-key.keystore
echo 密钥别名: my-key-alias
echo 密钥密码: android
echo 存储密码: android
pause
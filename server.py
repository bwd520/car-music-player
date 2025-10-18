#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
简单的HTTP服务器，用于测试车机音乐播放器
使用方法: python server.py
然后在浏览器中访问 http://localhost:8000
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # 添加CORS头，允许跨域访问
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def log_message(self, format, *args):
        # 自定义日志格式
        print(f"[{self.log_date_time_string()}] {format % args}")

def main():
    # 确保在正确的目录中运行
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    print("=" * 50)
    print("🚗 车机音乐播放器 - 本地测试服务器")
    print("=" * 50)
    print(f"服务器端口: {PORT}")
    print(f"工作目录: {script_dir}")
    print()
    
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"✅ 服务器启动成功!")
            print(f"📱 应用地址: http://localhost:{PORT}")
            print(f"🧪 测试页面: http://localhost:{PORT}/test-app.html")
            print()
            print("💡 使用提示:")
            print("- 在浏览器中打开上述地址")
            print("- 按 Ctrl+C 停止服务器")
            print("- 建议使用Chrome或Firefox浏览器")
            print()
            
            # 自动打开浏览器
            try:
                webbrowser.open(f'http://localhost:{PORT}/test-app.html')
                print("🌐 已自动打开测试页面")
            except:
                print("⚠️ 无法自动打开浏览器，请手动访问上述地址")
            
            print("\n🎵 服务器运行中...")
            print("-" * 50)
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n👋 服务器已停止")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ 端口 {PORT} 已被占用，请尝试其他端口")
            print(f"或者运行: python server.py {PORT + 1}")
        else:
            print(f"❌ 服务器启动失败: {e}")
    except Exception as e:
        print(f"❌ 未知错误: {e}")

if __name__ == "__main__":
    # 支持自定义端口
    if len(sys.argv) > 1:
        try:
            PORT = int(sys.argv[1])
        except ValueError:
            print("❌ 端口号必须是数字")
            sys.exit(1)
    
    main()
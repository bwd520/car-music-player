const { contextBridge, ipcRenderer } = require('electron');

// 向渲染进程暴露安全的API
contextBridge.exposeInMainWorld('electronAPI', {
  // 接收主进程发送的控制命令
  onControlCommand: (callback) => {
    ipcRenderer.on('control-command', (event, command) => {
      callback(command);
    });
  },
  
  // 发送消息到主进程
  sendMessage: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  
  // 获取系统信息
  getSystemInfo: () => {
    return {
      platform: process.platform,
      version: process.version
    };
  },
  
  // 注销事件监听器
  removeListener: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});
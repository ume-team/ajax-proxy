环境运行指南
1. MacOS
 前提:MacOS上安装homebrew工具包
 安装/运行方法:
   打开命令行窗口运行
   i) 安装nodejs运行环境
     $ brew install node             
     查看nodejs和npm版本
     $ node -v
     $ npm -v
   ii) 运行【ume-node-server】
     进入 ume-node-server 目录下运行
     $ npm install express --save
     查看express版本
     $ npm list express
     运行服务器
     $ node start-server.js


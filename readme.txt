运行指南

前提需求
 运行机器上已经实现安装好nodejs且版本号为v7.6.0以上
 可以在命令行工具上输入如下指令查看nodejs和npm版本(通常安装nodejs后npm会自动带入)
  node -v
  npm -v
   
启动nodejs服务器
 1 第一次启动前，首先用如下指令检查本地是否已经导入node express
   npm list express
    如果本地没有express，进入"ume-node-server"目录下运行一次
     cd ajax-proxy/ume-node-server
     npm install express --save
 2 启动服务器
   node start-server.js

如果控制台显示类似如下的信息，代表服务器启动成功
___________________________________________________________
Load config: { localHttpPort: XXX,
  localPathMapping: 'XXX',
  remoteServerAddress: 'XXX',
  remoteServerPort: XXX }
Node server started on XXX
Root path start with  /XXX/*
___________________________________________________________

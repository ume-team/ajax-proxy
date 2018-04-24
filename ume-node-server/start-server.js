var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');
var fs = require("fs");
var proxy = require('./service-proxy');
var config = require('./config');
// var url = require("url");

// 设置Node Express实例
var app = express();

// 设置Body解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var mapping = config.localPathMapping + '/*'
//设置路径映射
app.get(mapping, proxy.proxyGet);
app.post(mapping, proxy.proxyPost);
 
// 启动服务器
var server = app.listen(config.localHttpPort, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Node server started on ", host, port);
  console.log("Root path start with ", mapping);
})


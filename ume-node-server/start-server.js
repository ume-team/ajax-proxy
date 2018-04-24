var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');
var proxy = require('./service-proxy');
var config = require('./service-config');
// var url = require("url");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var mapping = '/' + config.local.serviceRootMapping + '/*'

// Mapping uri path
app.get(mapping, proxy.proxyGet);
app.post(mapping, proxy.proxyPost);
 
// Start nodejs server
var server = app.listen(config.local.servicePort, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server has started @", host, port);
  console.log("mapping for ", mapping);

})


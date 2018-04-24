var util = require('util');
var http=require('http');
var querystring=require('querystring');
var config = require('./config');
//var bodyParser = require('body-parser');

/* 
 * 处理GET请求
 */
var proxyGet = function (req, res) {
	doHttpRequest(req, res, 'GET');
}

/* 
 * 处理POST请求
 */
var proxyPost = function (req, res) {
	doHttpRequest(req, res, 'POST');
}


/* 
 * HTTP远程调用逻辑实现
 */
var doHttpRequest = function (req, res, method) {
	// var path = req.path;
	// var params = util.inspect(req.params);
	// var query = util.inspect(req.query);
	var clientAddress = req.ip;
	var originalUrl = req.originalUrl;
	var body = ''
	var token = ''

	if (req.body) {
		body = util.inspect(req.body);
	}
	if (body === '{}') {
		// 过滤空值
		body = ''
	}
	
	// 判断Token值
	if (req.header('Token')) {
		token = req.header('Token');
	}
	// console.log("originalUrl:", originalUrl);
	// console.log("query:", query);
	
	contentType = 'application/json; charset=UTF-8';
	if (config.remoteContentType) {
		contentType = config.remoteContentType
	}

	// 构建HTTP调用参数
	var options = {
   		hostname:config.remoteServerAddress,
   		port:config.remoteServerPort,
   		path:originalUrl,
   		method:method,
   		headers:{
   			'Content-Type':contentType,
   			'x-forwarded-for':clientAddress,
   			'Token':token
   		}
   	}

	var result = ''
	var httpClient=http.request(options, function(remoteResponse) {
			remoteResponse.setEncoding('utf-8');
			remoteResponse.on('data',function(chunk){
				result += chunk
				// console.log(`On Date:`,chunk);
			});
			remoteResponse.on('end',function(){
				// console.log('On End.');
			   	res.send(result);
			   	// res.json(result);
			});
	});

	httpClient.on('error', (e) => {
  		console.error(`Http request error:`, e);
	});	
	if (body != '') {
		httpClient.write(body);
	}
	httpClient.end();
}

exports.proxyGet = proxyGet;
exports.proxyPost = proxyPost;






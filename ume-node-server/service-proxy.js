//var bodyParser = require('body-parser');
var config = require('./service-config');
var util = require('util');
var http=require('http');
var querystring=require('querystring');

/* 
 * Do remote GET request.
 */
var proxyGet = function (req, res) {
	doHttpRequest(req, res, 'GET');
}

/* 
 * Do remote POST request.
 */
var proxyPost = function (req, res) {
	doHttpRequest(req, res, 'POST');
}


/* 
 * Do remote http process.
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
		body = ''
	}

	if (req.header('Token')) {
		token = req.header('Token');
	}
	// console.log("originalUrl:", originalUrl);
	// console.log("query:", query);
	var options = {
   		hostname:config.remote.serviceAddress,
   		port:config.remote.servicePort,
   		path:config.remote.servicePath + originalUrl,
   		method:method,
   		headers:{
   			'Content-Type':config.remote.serviceContentType,
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






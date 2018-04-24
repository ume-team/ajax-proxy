
/* 
 * Local server configurations.
 */
var local = {
	servicePort: 8081,
	serviceRootMapping: 'capi'
}

/* 
 * Remote web service server configurations.
 */
var remote = {
	serviceAddress: '114.115.185.91',
	servicePort: '8080',
	servicePath: '/ume-quickstart-boot-uac',
	serviceContentType: 'application/json; charset=UTF-8'
}

exports.local = local
exports.remote = remote


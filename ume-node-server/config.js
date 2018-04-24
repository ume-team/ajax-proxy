var fs = require("fs");
var data = JSON.parse(fs.readFileSync("config.json"));

console.log("Load config:", data);

module.exports = data



///* 
// * Local server configurations.
// */
//var local = {
//	servicePort: 8081,
//	serviceRootMapping: '/ume-quickstart-boot-uac'
//}
//
///* 
// * Remote web service server configurations.
// */
//var remote = {
//	serviceAddress: '114.115.185.91',
//	servicePort: '8080'
//}
//
//exports.local = local
//exports.remote = remote


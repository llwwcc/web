var http =require('http');
var fs = require('fs');
var port = 3000;

var server =http.createServer(function(req,res){
	console.log(req.url);
	if(req.url == "/favicon.ico"){
		res.end("favicon.ico");
	}
	var fliePath="./"+req.url;

})
server.listen(3000,'127.0.0.1',function(){
	console.log('server running at http://127.0.0.1:3000')
});
var http =require('http');
var fs = require('fs')
var server=http.createServer(function(req,res){
	console.log(req.url);

	var filePath='./'+req.url
	fs.readFile(filePath,function(err,data){
		if(err){
			res.end('not found')
		}else{
			res.end(data)
		}
	});
})
server.listen(3000,'127.0.0.1',function(){
	console.log('server running at http://127.0.0.1:3000')
})
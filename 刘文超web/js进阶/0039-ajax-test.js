 
var http =require('http');
 
var fs =require('fs');
var url = require('url');
var server=http.createServer(function(req,res){
	console.log(req.method);
	if(res.url =='/favicon.ico'){
		res.end('favicon.ico')
	}
	if(req.method == "POST"){
		var body="";
		req.on("data",function(chunck){
			body +=chunck;
		})
		req.on("end",function(){
			console.log(body);
			res.end(body);
		})
	}else if(req.method == "GET"){
		if(req.url.search(/\?/) !=-1){
			var parm = url.parse(req.url,true)
			console.log(parm);
			var objJson = JSON.stringify(parm);
			res.end(objJson);
		}else{
			var fliePath ='./'+req.url;
			fs.readFile(fliePath,function(err,data){
				if(err){
					res.statusCode = 404;
					res.end('not fonud')
				}else{
					res.end(data);
				}
			})
		}
		
	}else{
		res.end('ok');
	}	
})  

server.listen(3000,'127.0.0.1',function(){
	console.log('server running at http://127.0.0.1:3000');
});
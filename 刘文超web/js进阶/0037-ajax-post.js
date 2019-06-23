 
var http =require('http');
 
var fs =require('fs');
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
		var fliePath ='./'+req.url;
		fs.readFile(fliePath,function(err,data){
			if(err){
				res.statusCode = 404;
				res.end('not fonud')
			}else{
				res.end(data);
			}
		})
	}else{
		res.end('ok');
	}	
})  

server.listen(3000,'127.0.0.1',function(){
	console.log('server running at http://127.0.0.1:3000');
});
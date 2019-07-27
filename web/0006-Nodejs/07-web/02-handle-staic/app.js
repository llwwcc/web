const http = require('http');
const fs   =require('fs');
const path   =require('path');
const {get,add,del}=require('./model/item.js');
const mine = require('./mime.json')
const url =require('url')
const swig =require('swig')
const querystring =require('querystring')
const server=http.createServer((req,res)=>{
	//1.读取文件
	// 路由:处理不同请求做不同处理
			console.log(req.method+'...'+req.url)
			const parseUrl = url.parse(req.url,true)
			const pathname=parseUrl.pathname
			// 路由处理
			
			// 首页路由
			if(pathname =='/'|| pathname=='/index.html'){
				//1.获取数据
				get()
				.then(data=>{
					//2.蒋数据分配到页面并返回到页面
					const filePath = path.normalize(__dirname+'/'+req.url)
					// 引入模版

					var template = swig.compileFile(__dirname+"/"+"index.html")
					var html = template({data:data});
					console.log(html)
					res.end(html);	
					
				})
				.catch(err=>{
					res.statsuCode=404;
					res.end('<h2>文件出错了</h2>');
				})
				
			}
			else if(pathname =='/add'){
				//1.获取参数
				let body ='';
				req.on('data',(chunk)=>{
					body +=chunk;
				})
				req.on('end',()=>{
					const query = querystring.parse(body)
					add(query.task)
					.then(data=>{
						res.end(JSON.stringify({
						code:0,
						message:'添加成功',
						data:data
						}))
					})
					.catch(data=>{
						console.log('add task err',err)
						res.end(JSON.stringify({
						code:0,
						message:'添加失败'
						
						}))
					})
				})

				//2.根据参数生成任务对象并且写入到文件中
				//2.如果写入成功，蒋新生成的任务对象返还给前端
			
			}
			else if(pathname =='/del'){
				const id =parseUrl.query.id;
				console.log(id)
				del(id)
				.then(()=>{
					res.end(JSON.stringify({
						code:0,
						message:'删除成功'
					}))
				})
				.catch((err)=>{
					res.end(JSON.stringify({
						code:0,
						message:'删除失败'
					}))
				})
			}
			// 静态资源的处理
			else{
					const filePath = path.normalize(__dirname+'/'+req.url)
					fs.readFile(filePath,(err,data)=>{
						if(err){
							res.setHeader("Content-type","text/html;charset=UTF-8")
							res.end('<h2>文件出错了</h2>');
						}else{
							// res.setHeader("Content-type","text/html;charset=UTF-8")
							const extname =path.extname(filePath);
							const minStype =mine[extname];
							res.end(data);	
						}
					})
			}

})
server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running on http://127.0.0.1')
})
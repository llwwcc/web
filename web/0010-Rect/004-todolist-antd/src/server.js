 const http = require('http')
 const server = http.createServer((req,res)=>{
 	res.end(JSON.stringify(['learn js','leran ajax']))
 	res.setHeader('Access-Control-Allow-Origin','*')
 })
 server.listen(3000,'127.0.0.1',()=>{
 	console.log('server is running at http://1270.0.0.1')
 })
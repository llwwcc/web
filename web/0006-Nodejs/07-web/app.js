const http = require('http');
const server=http.createServer((req,res)=>{
	res.write('hello')
	res.end('hello')
})
server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running at 127.0.0.1')
})
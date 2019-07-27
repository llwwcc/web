const fs = require('fs');
const rs = fs.createReadStream('./KoalaSetup.exe');

rs.on('open',()=>{
	console.log('write stream open...')
})
rs.on('close',()=>{
	console.log('write stream close...')
})
rs.on('end',()=>{
	console.log('write stream end...')
})
rs.on('data',(chunk)=>{
	console.log('chunk',chunk)
})
// ws.write('hello');
// ws.write('good');
// ws.end()

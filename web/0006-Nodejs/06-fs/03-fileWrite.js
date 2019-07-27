const fs = require('fs');
const ws = fs.createWriteStream('./w.txt')
ws.on('open',()=>{
	console.log('write stream open...')
})
ws.on('close',()=>{
	console.log('write stream close...')
})
ws.on('finish',()=>{
	console.log('write data end...')
})
ws.write('hello');
ws.write('good');
ws.end()

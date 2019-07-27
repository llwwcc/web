
const fs =require('fs');
//1.同步
//1.1逐步操作
/*
//1.1.1打开文件
const fd =fs.openSync('./0.1text.txt','w')
console.log(fd)
//1.1.2写文件
fs.writeSync(fd,'hello')
//1.1.3关闭文件
fs.closeSync(fd)
*/
//1.2合并操作
// fs.writeSync('./0.1text.txt','hello',{flag:'a'});
//2.异步操作
//2.1逐步操作
//2.1.1打开文件
fs.open('./0.1text.txt','w',()=>{
	console.log('file')
})
//2.1.2写文件
fs.writeFile('./0.1text.txt','nihao','w',(err)=>{
	console.log('nihao')
})

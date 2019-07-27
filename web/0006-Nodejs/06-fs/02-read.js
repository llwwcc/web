const fs =require('fs');
const util =require('util');

//读取文件同步
const fd =fs.openSync('./0.1text.txt','r')
const buf =Buffer.alloc(100)
fs.readSync(fd,buf,0,50,0)
// console.log(buf)
//合并操作
// const data =fs.readFileSync('./0.1text.txt',{encoding:'utf-8'})
// console.log(data)



//读取文件异步
fs.open('./0.1text.txt','r',(err,fd)=>{
	if(err){
		console.log('open file err',err)
	}else{
		console.log(buf)
	}
	//关闭文件
	fs.close(fd,(err)=>{
		if(err){
			console.log('err')
		}
	})
})
//promise处理异步

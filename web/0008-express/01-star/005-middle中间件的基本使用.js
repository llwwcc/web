const express = require('express');
const app =express();
const port=3000;
app.use(express.static('test'));
app.use((req,res,next)=>{
	console.log('do something now');
	// res.send('task something A')
	next()

})
 
app.get('/get',(req,res)=>{res.send('get success data')})
app.post('/post',(req,res)=>{res.send('post success data')})




app.listen(port,()=>console.log('app server at port 3000'))
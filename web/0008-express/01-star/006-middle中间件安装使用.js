const express = require('express');
const app =express();
const port=3000;


const bodyParser = require('body-parser')

app.use(express.static('test'));

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
 
app.post('/post', urlencodedParser, function (req, res) {
  res.send('data, ' + req.body.username)
})
 
app.get('/get',(req,res)=>{res.send('get success data')})
app.post('/post',(req,res)=>{res.send('post success data')})




app.listen(port,()=>console.log(`app server at port ${port}`))
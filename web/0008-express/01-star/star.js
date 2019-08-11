const express = require('express')
const app = express()

app.use(express.static('test'))
app.all('/get',(req,res,next)=>{
	console.log('get request scuess0000')
	// next();
})

app.get('/get', (req, res) => res.send('get request scuess'))
app.post('/post', (req, res) => res.send('post request scuess'))
app.put('/put', (req, res) => res.send('put request scuess'))
app.delete('/delete', (req, res) => res.send('delete request scuess'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
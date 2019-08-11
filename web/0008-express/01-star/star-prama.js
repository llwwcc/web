const express = require('express')
const app = express()

app.use(express.static('test'))


app.get('/users/:userId/books/:bookId',(req, res) =>{
	res.send('get request scuess')
	console.log(req.params)
} )
app.get('/',(req, res) =>{
	res.send('get request scuess')
	console.log(res.query)
} )
app.post('/post', (req, res) => res.send('post request scuess'))
app.put('/put', (req, res) => res.send('put request scuess'))
app.delete('/delete', (req, res) => res.send('delete request scuess'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
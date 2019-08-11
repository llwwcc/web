const express = require('express')
const swig = require('swig')
const app = express()
const port = 3000

// app.use(express.static('views'))

swig.setDefaults({
	cache:false
})


app.engine('html',swig.renderFile)



app.set('views', './views')

app.set('view engine', 'html')

app.get('/',(req,res)=>{

    res.render('index',{
        title:'跨猪网',
        name:'leo',
        obj:{
        	major:'computer'
        },
        arr:['name',11]
    })
})

app.listen(port,()=>{console.log(`app server doing at ${port}`)})
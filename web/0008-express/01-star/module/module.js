const express= require('express');

const router = express.Router();

router.get('/',(req,res)=>{res.send('get request data')})
router.post('/',(req,res)=>{res.send('post request data')})
router.put('/',(req,res)=>{res.send('put request data')})
router.delete('/',(req,res)=>{res.send('delete request data')})

module.exports=router
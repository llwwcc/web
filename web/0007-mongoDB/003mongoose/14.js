/*
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true})
const db = mongoose.connection;
*/
const mongoose = require('mongoose')
const UserModel=require('./modle/1user.js')

const db = mongoose.connection;
const getRandom=(min,max)=>{
  return Math.round(min+(max-min)*Math.random())
}
const name=['tome','leo','aimy','rick','toniy','mike','coco']
const major=['computer','math','english']
const getName=()=>name[getRandom(0,name.length-1)]
const getMajor=()=>major[getRandom(0,major.length-1)]
//连接数据库失败
db.on('error',()=>{
    console.log('connection db error')
    throw 'connection db error'
})

db.once('open',()=>{
    //1.定义Schema
  console.log('connection db success')
    // UserModel.create({name:'Mick',age:12}(err,doc)=>{
    //   if(err){
    //     console.log('insertMany....',err)
    //   }else{
    //     console.log(doc)
    //   }
    // })






})

   







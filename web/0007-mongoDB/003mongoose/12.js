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
    })

    //2.根据Schema定义数据模型
    //2.1 model方法第一个参数指定集合名称,mongoose会默认转换为复数
    //2.2 model方法第二个参数指定Schema
    // const UserModel = mongoose.model('user', UserSchema);

    // //3.使用模型(CRUD)
    // //3.1 新增
  
    // const user = new UserModel({name:"Amy",age:88,major:"Computer"})
    // user.save((err,doc)=>{
    //     if(err){
    //         console.log('save user error:',err)
    //     }else{
    //         console.log(doc)
    //     }
    // })
 
 //   //3.2 查找
  
 //   UserModel.find({},(err,docs)=>{
 //        if(err){
 //            console.log('find user error:',err)
 //        }else{
 //            console.log(docs)
 //        }    
 //   })
 
 //  //3.3 更新

 //  UserModel.updateOne({name:"Tom"},{$set:{age:10}},(err,result)=>{
 //        if(err){
 //            console.log('updateOne user error:',err)
 //        }else{
 //            console.log(result)
 //        }       
 //  })
  
 // //3.4 删除
 
 // UserModel.deleteOne({name:"Tom"},(err,result)=>{
 //        if(err){
 //            console.log('deleteOne user error:',err)
 //        }else{
 //            console.log(result)
 //        }       
 //  })
  
  const arr=[];
 for(let i=0;i<100;i++){
  arr.push({
    name:getName(),
    age:getRandom(10,150),
    major:getMajor()
  })
 }
 // console.log(arr);
 // UserModel.insertMany(arr)
 // .then(doc=>{
 //    console.log(doc)
 // })
 // .catch(err=>{
 //  console.log(' insertMany err',err)
 // })

// UserModel.find({age:{$gt:100}},(err,doc)=>{
//   if(err){
//     console.log('err',err);
//   }else{
//     console.log(doc)
//   }
// })
 //查找数据
// UserModel.find({age:{$gt:130}},null,{sort:{age:1}},(err,doc)=>{
//   if(err){
//     console.log('err',err);
//   }else{
//     console.log(doc)
//   }
// })
 // 删除数据
 /*
 UserModel.deleteOne({age:{$lt:50}},(err,doc)=>{
      if(err){
      console.log('err',err);
    }else{
      console.log(doc)
    }
 })   deleteMany 是删除多条数据
 */
// 获得去重后的值
UserModel.distinct('major',{name:'tome'},(err,doc)=>{
      if(err){
      console.log('err',err);
    }else{
      console.log(doc)
    }
 }) 







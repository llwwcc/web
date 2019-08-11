const express = require('express')
const pagination = require('../until/pagination.js')
const router = express.Router()
const Usermodle = require('../module/user.js')
//显示管理员首页
router.use((req,res,next)=>{
    if(req.userInfo.isAdmin){
        next();
    }else{
        res.send('<h1>请用管路员账号登录</h1>')
    }
})

router.get('/', (req, res) => {
    res.render('admin/index')
})
// 显示用户列表
router.get('/users',(req,res)=>{
    /*
    分页分析
    前提条件:得知获得第几页，前端发送参数page
    约定:每一页显示多少数据,约定每页显示2条,limit:2,
    举例:
    1
    2
    3
    4
    5
    6

    第1页 显示 第 1,2, 跳过 0 条 skip(0) 取 2 条 limit(2)
    第2页 显示 第 3,4, 跳过 2 条 skip(2) 取 2 条 limit(2)
    第3页 显示 第 5,6, 跳过 4 条 skip(4) 取 2 条 limit(2)
    
    第 page 页, 跳过(page-1)*limit 条

    */
    // let page=req.query.page
    /*
    const limit =2;
   
    page=parseInt(page)
    if(isNaN(page)){
        page=1
    }
    //上边界 
    if(page==0){
        page=1
    }
   
   Usermodle.countDocuments((err,count)=>{
    const pages =Math.ceil(count/limit)
    if(page >pages){
        page=pages
    }
    const skip=Math.abs((page-1)*limit)
    const list=[];
    for(let i=1 ;i<=pages;i++){
        list.push(i)
    }
     Usermodle.find({})
     .sort({_id:-1})
    .skip(skip)
    .limit(limit)
    .then(users=>{
        res.render('admin/user_list',{
            userInfo:req.userInfo,
            users:users,
            page:page,
            list:list
        })
    
    })
    .catch(err=>{
        console.log('err',err)
    })


   })
*/

   

  let page = req.query.page
    const options = {
        page:req.query.page,
        model:Usermodle,
        query:{},
        sort:{_id:-1},
        projection:"-password -__v"
    }
    pagination(options)
    .then(data=>{
        res.render("admin/user_list",{
            userInfo:req.userInfo,
            users:data.docs,
            page:data.page,
            list:data.list,
            pages:data.pages,
            url:"/admin/users"
        })       
    })
    .catch(err=>{
       console.log('get users err:',err) 
    }) 
          
  
})
// 显示分类列表

router.get('/',(req,res)=>{
    res.render('admin/category',{
        userInfo:userInfo
    })
})
 

module.exports = router
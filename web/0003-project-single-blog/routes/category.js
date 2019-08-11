const express = require('express')
const app = express()
const CategoryModel = require('../module/category.js')
const router = express.Router()
const Usermodle = require('../module/user.js')
const pagination = require('../until/pagination.js')
// 显示分类列表
router.get('/', (req, res) => {
    let page = req.query.page
    const options = {
        page:req.query.page,
        model:CategoryModel,
        query:{},
        sort:{order:-1},
        projection:"-__v"
    }
    pagination(options)
    .then(data=>{
        res.render("admin/category",{
            userInfo:req.userInfo,
            categories:data.docs,
            page:data.page,
            list:data.list,
            pages:data.pages,
            url:"/category"
        })       
    })
    .catch(err=>{
       console.log('get category err:',err) 
    }) 
          
})

//add内容
router.get('/add', (req, res) => {
    res.render('admin/add_edit',{
        userInfo:req.userInfo
    })
})

//处理添加分类
router.post('/add', (req, res) => {
    let { name,order } = req.body
    if(!order){
    	order=0
    }
    CategoryModel.findOne({name:name})
    .then(category=>{
        if(category){
            res.render("admin/err",{
                message:"分类已经存在",
                url:'/category'
            })
            // res.send('err')
        }else{
            CategoryModel.insertMany({name:name,order:order})
            .then(categories=>{
                res.render("admin/success",{
                    message:"新增分类成功",
                    
                })
                // res.send('ok')
            })
            .catch(err=>{
                let message = "数据库操作失败"
                if(err.errors['name'].message){
                    message = err.errors['name'].message
                }
                res.render("admin/err",{
                    message:message,
                    url:'/category'
                })
                // res.send('err')
            })
        }
    })
    .catch(err=>{
        res.render("admin/err",{
            message:"数据库操作失败",
            url:'/category'
        })
        // res.send('err')
    })

})
//编辑分类
router.get('/edit/:id',(req,res)=>{
	const {id} =req.params
	CategoryModel.findById(id)
    .then(category=>{
        res.render('admin/add_edit',{
        userInfo:req.userInfo,
        category:category
        })
    })
    .catch(err=>{
        res.render('admin/err',{
            message:'数据库操作失败',
            url:'/category'
            })

    }) 
   
})
// 处理编辑分类
router.post('/edit',(req,res)=>{
   let { name,order,id } = req.body
    if(!order){
        order=0
    }
    console.log(name,order,id)
    CategoryModel.findById(id)
    .then(category=>{
        if(category.name==name && category.order==order){
            res.render('admin/err',{
                message:'请更新后再提交'
               
            })
        }else{
            CategoryModel.findOne({name:name,_id:{$ne:id}})
            .then(category=>{
                if(category){
                    res.render('admin/err',{
                    message:'分类名已经存在'
                    })
                }else{
                    CategoryModel.updateOne({_id:id},{name,order})
                    .then(result=>{
                        res.render("admin/success",{
                            message:"更新分类成功",
                            url:'/category'
                         })
                    })
                    .catch(err=>{
                        res.render('admin/err',{
                            message:'数据库操作失败',
                            url:'/category'
                            })
                    }) 
                }
            })
            .catch(err=>{
                res.render('admin/err',{
                    message:'数据库操作失败',
                    url:'/category'
                    })
            }) 
        }
    })
    .catch(err=>{
        // res.render('admin/err',{
        //     message:'数据库操作失败',
        //     url:'/category'
        //     })
        res.send('err')
    }) 

})
//处理删除操作
router.get('/delete/:id',(req,res)=>{
    const {id} =req.params
    CategoryModel.deleteOne({_id:id})
    .then(category=>{
        res.render('admin/success',{
            message:'删除分类成功',
            url:'/category'
        })
    })
    .catch(err=>{
        res.render('admin/err',{
            message:'数据库操作失败',
            url:'/category'
            })
    }) 
   
})


module.exports = router
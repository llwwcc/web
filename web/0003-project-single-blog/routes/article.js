const express = require('express')
const app = express()
const ArticleModel = require('../module/article.js')
const router = express.Router()
const Usermodle = require('../module/user.js')
const Categorymodle = require('../module/category.js')
const pagination = require('../until/pagination.js')
// 显示分类列表
router.get('/', (req, res) => {
    /*
    let page = req.query.page
    const options = {
        page:req.query.page,
        model:ArticleModel,
        query:{},
        sort:{_id:-1},
        projection:"-__v",
        populates:[{path:'user',select:'username'},{path:'category',select:'name'}]
    }
    pagination(options)
    */
    ArticleModel.getPaginationArticleseDate(req)
    .then(data=>{
        res.render("admin/article",{
            userInfo:req.userInfo,
            articles:data.docs,
            page:data.page,
            list:data.list,
            pages:data.pages,
            url:"/article"
        })       
    })
    .catch(err=>{
       console.log('get article err:',err) 
    }) 
          
})

//add内容
router.get('/article_add', (req, res) => {
	Categorymodle.find({},'name')
	.sort({order:-1})
	.then(categories=>{
			res.render('admin/article_add_edit',{
        		userInfo:req.userInfo,
        		categories
    		})
	})
   
})

//处理添加文章
router.post('/add', (req, res) => {
    const { title,category,intro,content} = req.body
     ArticleModel.insertMany({title,
         	category,
         	intro,
         	content,
         	user:req.userInfo._id
        })
   	.then(articles=>{
        res.render("admin/success",{
            userInfo:req.userInfo,
            message:"新增文章成功",
            url:'/article'
        })
    })
    .catch(err=>{
        let message = "数据库操作失败"
        if(err.errors['name'].message){
            message = err.errors['name'].message
        }
        res.render("admin/err",{
            message:message,
            url:'/article'
        })

    })

})
//添加文章分类
router.get('/edit/:id',(req,res)=>{
	const {id} =req.params
    Categorymodle.find({},'name')
    .sort({order:-1})
    .then(categories=>{
        ArticleModel.findById(id)
        .then(article=>{
            res.render('admin/article_add_edit',{
            userInfo:req.userInfo,
            article,
            categories
            })
        })
        .catch(err=>{
            res.render('admin/err',{
                message:'数据库操作失败',
                url:'/article'
                })
        })   


    })
    .catch(err=>{
            res.render('admin/err',{
                message:'数据库操作失败',
                url:'/article'
                })
    }) 
	
   
})
// 处理编辑文章
router.post('/edit',(req,res)=>{
   let { title,category,intro,conten,id} = req.body
        ArticleModel.updateOne({_id:id},{title,category,intro,conten})
        .then(result=>{
            res.render("admin/success",{
                message:"编辑文章成功",
                url:'/article'
             })
        })
        .catch(err=>{
            res.render('admin/err',{
                message:'数据库操作失败',
                url:'/article'
                })
        }) 
       
    })
    
//处理删除操作
router.get('/delete/:id',(req,res)=>{
    const {id} =req.params
    ArticleModel.deleteOne({_id:id})
    .then(category=>{
        res.render('admin/success',{
            message:'删除文章成功',
            url:'/article'
        })
    })
    .catch(err=>{
        res.render('admin/err',{
            message:'数据库操作失败',
            url:'/article'
            })
    }) 
   
})

module.exports = router
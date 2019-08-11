const express = require('express')
const Categorymodle = require('../module/category.js')
const Articlemodle = require('../module/article.js')
const router = express.Router()

async function getCommonDate(){
    const categorisePromise=Categorymodle.find({},'name').sort({order:-1})
    const ArticlePromise =Articlemodle.find({},'click title ').sort({click:-1}).limit(10)
    const cagetories = await categorisePromise
    const Articles = await ArticlePromise
    return {
        cagetories,
        Articles
    }
}
// 处理文章分页请求
router.get('/articles', (req, res) => {
    Articlemodle.getPaginationArticleseDate(req)
    .then(data=>{
        res.json({
            status:0,
            message:'获取文章数据成功',
            data:data
        })
    })
    .catch(err=>{
        res.json({
            status:10,
            message:'获取文章数据失败'
        })
    })
})
   





//显示首页
router.get('/', (req, res) => {
	getCommonDate()
    .then(data=>{
        const {cagetories,Articles} =data
        Articlemodle.getPaginationArticleseDate(req)
        .then(data=>{
            res.render("main/index",{
                userInfo:req.userInfo,
                cagetories,
                Articles,
                //首页文章分页数据
                articles:data.docs,
                page:data.page,
                list:data.list,
                pages:data.pages,
                url:"/"
            }) 
        })
        
    })
   
})

//显示列表页
router.get('/list', (req, res) => {

    res.render("main/list",{
    	userInfo:req.userInfo
    })
})


//显示详情页
router.get('/detail', (req, res) => {
    res.render("main/detail",{
    	userInfo:req.userInfo
    })
})

module.exports = router
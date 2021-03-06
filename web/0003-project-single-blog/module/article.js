/*
* @Author: TomChen
* @Date:   2019-07-31 09:42:47
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-04 16:27:34
*/
const mongoose = require('mongoose')

const pagination = require('../until/pagination.js')
//1.定义Schema
const ArticleSchema = new mongoose.Schema({
   title:{
        type:String,
        required:[true,"文章标题必须输入"],
    },
    intro:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'        
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    click:{
        type:Number,
        default:0
    },
    content:{
        type:String
    }
})
ArticleSchema.virtual('createdTime').get(function(){
    return new Date(this.createdAt).toLocaleString()
})
ArticleSchema.statics.getPaginationArticleseDate = function(req,query={}){
    let page = req.query.page
    const options = {
        page:req.query.page,
        model:this,
        query:query,
        sort:{_id:-1},
        projection:"-__v",
        populates:[{path:'user',select:'username'},{path:'category',select:'name'}]
    }
    return  pagination(options)
   
}


const ArticleModel = mongoose.model('article', ArticleSchema)

module.exports = ArticleModel
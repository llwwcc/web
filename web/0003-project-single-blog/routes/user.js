const express = require('express')
const Usermodle = require('../module/user.js')
const router = express.Router()
const hmac = require('../until/hmac.js')

//注册
router.post('/register', (req,res) => {
	var {username,password}=req.body
	// 要有用户模型
	// 2.同名验证
	Usermodle.findOne({username:username})
	.then(user=>{
		if(user){
			console.log(user);
			res.json({
		    	status:10,
		    	message:'该用户名已注册，请换一个'
		    })
		} 
		// 如果没有
		else{
			console.log(user);
			// 插入数据
			Usermodle.insertMany({
				username:username,
				password:(password),
				// isAdmin:true
			})
			.then(user=>{
				console.log(user);
				res.json({
		    		status:0,
		    		message:'注册成功',
		    		data:user
		   		})
			})
			.catch(err=>{
				throw err
			})
			
		}
	})
	.catch(err=>{
		console.log(err)
		res.json({
		    status:0,
		    message:'服务器端错误,请稍后再试'
		})
	}) 
})

// 登录
router.post('/login',(req,res)=>{
	// 1.获取参数
	var {username,password}=req.body
	// 2验证
	Usermodle.findOne({username:username,password:password},"-password -_v")
	.then(user=>{
		// 验证成功
		
		if(user){
			//生成cookies并返回前端
			// req.cookies.set('userInfo',JSON.stringify(user),{maxAge:1000*60*60*24})
			//设置session 
			req.session.userInfo=user;
			res.json({
		    		status:0,
		    		message:'登录成功',
		    		data:user
		   		})
		}
		// 验证失败
		else{
			res.json({
			    status:10,
			    message:'用户名和密码错误,请输重新输入'
			})
		}
	})
})
//退出
router.get('/logout',(req,res)=>{
	// req.cookies.set('userInfo',null)
	req.session.destroy()
	res.json({
		status:0,
		message:'退出登录成功'
	})
})
0
module.exports = router
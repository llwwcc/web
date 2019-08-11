const MongoClient = require('mongodb').MongoClient;
console.log(MongoClient)
// Connection url
const uri = 'mongodb://127.0.0.1:27017';
const client =new MongoClient(uri,{usNewUrlParser:true})
const dbName= 'it';
//1. 连接数据库

client.connect(err=>{
    const collection=client.db("it").collection('devices');
    if(err){
    	console.log('...',err)
    	throw err
    }
    console.log('success....')
    // 生成db 如果数据库中有就切换，没有就新建
    const db=client.db('db')
    const Collection= db.collection('users')
    /*
    Collection.insertMany([{name:'tome',age:15},{name:'leo',age:16}],(err,result)=>{
    	if(err){
    		console.log('insetMny err',err)
    	}else{
    		console.log('insetMny result',result)
    	}
    })
    */
    // 2.查询
    /*
     Collection.find({name:'tome'},(err,result)=>{
    	if(err){
    		console.log('find err',err)
    	}else{
    		console.log('find result',result)
    	}
    })
    */
	//3.更新
      /*
		Collection.updateOne({name:'tome'},{$set:{age:15}},(err,result)=>{
    	if(err){
    		console.log('find err',err)
    	}else{
    		console.log('find result',result)
    	}
        client.close();
    }) 
      */  
    //删除

        Collection.deleteOne({name:"Tom"},(err,result)=>{
            if(err){
                console.log('deleteOne error:',err)
            }else{
                console.log('deleteOne result:',result)
            }
        })    
         client.close();
	
	

})

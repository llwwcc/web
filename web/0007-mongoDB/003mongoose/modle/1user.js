const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true})

 const UserSchema = new mongoose.Schema({
        name: String,
        age:Number,
        major:String
    })
 const UserModel = mongoose.model('user', UserSchema);
 module.exports=UserModel;
 // console.log('UserModel;;;;;;',UserModel)
 	


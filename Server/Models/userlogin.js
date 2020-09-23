var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userLoginSchema=new Schema({
    userName:String,
    password:String
});
var userLogin=mongoose.model('userLogin',userLoginSchema);
module.exports=userLogin;
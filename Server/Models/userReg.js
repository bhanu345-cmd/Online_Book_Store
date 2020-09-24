var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userRegSchema=new Schema({
    firstName:String,
    lastName:String,
    userName:String,
    password:String,
    phnNo:Number,
    address:String,
    state:String,
    city:String,
    pincode:Number
});
var userReg=mongoose.model('userReg',userRegSchema);
module.exports=userReg;
var mongoose=require('mongoose');
var cart=mongoose.model('cart',new mongoose.Schema({
    book:{type:Object,required:true},
    quantity:{type:Number,required:true}
}));
module.exports=cart;
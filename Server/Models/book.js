var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bookSchema=new Schema({
    bookName:{type:String, required:true},
    author:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:String, required:true},
    publishedDate:{type:Date, required:false},
});
var books=mongoose.model('books',bookSchema);
module.exports=books;
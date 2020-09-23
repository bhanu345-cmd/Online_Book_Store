var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bookSchema=new Schema({
    bookName:String,
    author:String,
    price:Number,
    category:String,
    publishedDate:Date
});
var books=mongoose.model('books',bookSchema);
module.exports=books;
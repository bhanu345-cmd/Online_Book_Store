var express=require('express');
var mongoose=require('mongoose');
var app=express();
var bookController=require('./Controllers/bookController.js');
var userController=require('./Controllers/userController.js');
var config=require('./Config');
mongoose.connect(config.getDbConnectionString(),{useNewUrlParser:true,useUnifiedTopology:true});
app.use('/book',bookController);
app.use('/user',userController);
app.listen(4001,()=>{
    console.log('Server started running...')
});
var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var userLogin=require('../Models/userlogin.js');
var cors=require('cors');
var router=express.Router();
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
router.use(cors());
/*router.post('/loginSetup',(req,res)=>{
    var newUser=userLogin({
        userName:"bhanu@gmail.com",
        password:"bhanu123"
    });
    newUser.save(function(err,user){
        if(err){
            res.send({message:"Error 404"});
        }else if(user){
            res.send({message:"Saved successfully"});
        }else{
            res.send({message:"Unable to save user"});
        }
    });
});*/
router.post('/login',(req,res)=>{
    userLogin.find({userName:req.body.userName.trim()},function(err,users){
        if(err){
            res.send({message:'Error 404'});
        }else if(users){
            users.map((user)=>{
                if(user.password===req.body.password.trim()){
                    res.send({message:'true'});
                }else{
                    res.send({message:'false'});
                }
            });
            
        }else{
            res.send({message:"No user with that name"});
        }
    })
});

module.exports=router;
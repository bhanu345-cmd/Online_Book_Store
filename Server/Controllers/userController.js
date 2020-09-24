var express=require('express');
var bodyParser=require('body-parser');
var userReg=require('../Models/userReg.js');
var router=express.Router();
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
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
router.post('/reg',(req,res)=>{
    const {firstName,lastName,userName,password,phnNo,address,state,city,pincode}=req.body;
    const newUser=userReg({firstName:firstName,lastName:lastName,userName:userName,password:password,phnNo:phnNo,address:address,state:state,city:city,pincode:pincode});
    newUser.save(function(err,result){
        if(err){
            res.send({message:'Error in saving the user'});
        }else if(result){
            res.send({message:true})
        }else{
            res.send({message:false});
        }
    });

});

router.post('/login',(req,res)=>{
    userReg.find({userName:req.body.userName.trim()},function(err,users){
        if(err){
            res.send({message:'Error 404'});
        }else if(users){
               const user= users.find((user)=>{
                    if(user.password===req.body.password){
                        return user;
                    }
                });
                if(user){
                    
                    res.send({message:true});
                }else{
                    res.send({message:"Invalid password"});
                }
        }else{
                res.send({message:"No user with that name"});
        }
        
    });
});

module.exports=router;
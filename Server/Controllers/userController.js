var express=require('express');
var bodyParser=require('body-parser');
var userReg=require('../Models/userReg.js');
var config=require('../Config/secret');
var jwt=require('jsonwebtoken');
var bcrypt=require('bcryptjs');
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
router.post('/reg', (req,res)=>{
    const {firstName,lastName,userName,password,phnNo,address,state,city,pincode}=req.body;
    const newUser=userReg({firstName:firstName,lastName:lastName,userName:userName,password:bcrypt.hashSync(password, 8),phnNo:phnNo,address:address,state:state,city:city,pincode:pincode});
    userReg.findOne({userName:userName}).then((user)=>{
        if(user){
            res.send({message:"UserName already exists"});
        }else{
            newUser.save().then((result)=>{
                if(result){
                   res.send({message:true})
               }else{
                   res.send({message:false});
               }
           }).catch(err=>res.send({message:err}));
        }
    }).catch((err)=>res.send({message:err}));   
});

router.post('/login',(req,res)=>{
     userReg.findOne({userName:req.body.userName.trim()}).then((user)=>{
         if(user){
                if(bcrypt.compareSync(req.body.password,user.password)){
                    let token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });
                    return res.send({message:true,accessToken:token});
  
                }else{
                   return res.send({message:"Invalid password",accessToken:null});
                }
        }else{
               return res.send({message:"Invalid userName"});
        }
        
    }).catch((err)=>res.send({message:"Error in finding the user "}));
});
router.get('/getUser/:name',(req,res)=>{
    userReg.find({userName:req.params.name},function(err,user){
        if(user){
            res.send(user);
        }else{
            res.send("No books found with that name");
        }
    })
});
module.exports=router;
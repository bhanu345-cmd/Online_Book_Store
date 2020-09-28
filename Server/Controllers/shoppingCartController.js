var express=require('express');
var bodyParser=require('body-parser');
var books=require('../Models/book');
var router=express.Router();
var cart=require('../Models/shoppingCart');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
router.post('/addBook/:id',(req,res)=>{
    books.findById(req.params.id).then((book)=>{
        if(book){
            cart.findOne({book:book}).then((cartbook)=>{
                if(cartbook){
                    cart.findByIdAndUpdate(cartbook._id,{$inc:{quantity:1}}).then((result)=>{
                        if(result){
                            res.send({message:true,cartItem:result});//object
                        }else{
                            res.send({message:false});
                        }
                    }).catch(err=>res.send({message:err}));
                }else{
                    let newItem=cart({book:book,quantity:1});
                    newItem.save().then((item)=>{
                            if(item){
                                res.send(item);
                            }else{
                                res.send({message:false});
                            }
                    }).catch(err=>res.send({message:err}));
                }
            }).catch(err=>res.send({message:err}));
        }else{
            res.send({message:false});
        }
        
    }).catch((err)=>res.send({message:err}));
});

router.get('/getCartItems',(req,res)=>{
    cart.find({}).then((cartItems)=>{
        if(cartItems.length>0){
            res.send({cartItems:cartItems,message:true});//array
        }else{
            res.send({message:false});
        }
    }).catch((err)=>res.send({message:err}));
});

router.post('/deleteBook/:id',(req,res)=>{
    books.findById(req.params.id).then((book)=>{
        if(book){
            cart.findOne({book:book}).then((cartbook)=>{
                if(cartbook){
                    cart.findByIdAndRemove(cartbook._id).then(()=>{
                        res.send({message:true});
                    }).catch((err)=>res.send({message:err}));
                }else{
                    res.send({message:false});
                }
            }).catch(err=>res.send({message:err}));
        }else{
            res.send({message:false});
        }
    }).catch(err=>res.send({message:err}));
});

router.post('/inc/:id',(req,res)=>{
    books.findById(req.params.id).then((book)=>{
        if(book){
            cart.findOne({book:book}).then((cartbook)=>{
                if(cartbook){
                    cart.findByIdAndUpdate(cartbook._id,{$inc:{quantity:+1}}).then((result)=>{
                        if(result){
                            res.send({message:true,cartItem:result});//object
                        }else{
                            res.send({message:false});
                        }
                    }).catch(err=>res.send({message:err}));
                }else{
                    res.send({message:false});
                }
            }).catch(err=>res.send({message:err}));
        }else{
            res.send({message:false});
        }
    }).catch(err=>res.send({message:err}));
    
});

router.post('/dec/:id',(req,res)=>{
    books.findById(req.params.id).then((book)=>{
        if(book){
            cart.findOne({book:book}).then((cartbook)=>{
                if(cartbook){
                    cart.findByIdAndUpdate(cartbook._id,{$inc:{quantity:-1}}).then((result)=>{
                        if(result){
                            res.send({message:true,cartItem:result});//object
                        }else{
                            res.send({message:false});
                        }
                    }).catch(err=>res.send({message:err}));
                }else{
                    res.send({message:false});
                }
            }).catch(err=>res.send({message:err}));
        }else{
            res.send({message:false});
        }
    }).catch(err=>res.send({message:err}));
    
})


module.exports=router;
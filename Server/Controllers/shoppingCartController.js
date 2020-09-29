var express=require('express');
var bodyParser=require('body-parser');
var books=require('../Models/book');
var router=express.Router();
var cart=require('../Models/shoppingCart');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
router.post('/addBook',(req,res)=>{
            cart.find({userName:req.query.userName}).then((userCartBooks)=>{
                if(userCartBooks.length>0){
                    let cartbook=userCartBooks.find((userCartBook)=>{
                        for(const key in userCartBook.book){
                            if(userCartBook.book[key]==req.query.id){
                                return userCartBook;
                            }
                        }
                    }); 
                        if(cartbook){
                                cart.findByIdAndUpdate(cartbook._id,{$inc:{quantity:+1},totalPrice:cartbook.book.price*(cartbook.quantity+1)}).then((result)=>{
                                    if(result){
                                        res.send({message:true,cartItem:result});//object
                                    }else{
                                        res.send({message:false});
                                    }
                                }).catch(err=>res.send({message:err}));
                        }else{
                            res.send({message:false});
                        }
                }else{
                    books.findById(req.query.id).then((book)=>{
                        let newItem=cart({book:book,quantity:1,userName:req.query.userName,totalPrice:book.price});
                        newItem.save().then((item)=>{
                                if(item){
                                    res.send(item);
                                }else{
                                    res.send({message:false});
                                }
                        }).catch(err=>res.send({message:err}));
                    }).catch(err=>res.send(err));
                    
                }
            }).catch(err=>res.send({message:err}));
});

router.get('/getCartItems',(req,res)=>{
    cart.find({userName:req.query.userName}).then((userCartBooks)=>{
        if(userCartBooks.length>0){
                    res.send({cartItems:userCartBooks,message:true});//array
                }else{
                    res.send({message:false});
                }
            }).catch((err)=>res.send({message:err}));
        
});

router.post('/deleteBook',(req,res)=>{
        cart.find({userName:req.query.userName}).then((userCartBooks)=>{
                if(userCartBooks.length>0){
                    let cartbook=userCartBooks.find((userCartBook)=>{
                        for(const key in userCartBook.book){
                            if(userCartBook.book[key]==req.query.id){
                                return userCartBook;
                            }
                        }
                    });    
                    if(cartbook){
                        cart.findByIdAndRemove(cartbook._id).then(()=>{
                                res.send({message:true});
                            }).catch((err)=>res.send({message:err}));
                    }else{
                        res.send({message:false});
                    }
                }else{
                    res.send({message:false});
                }
            }).catch((err)=>res.send({message:err}));
                
});

router.post('/inc',(req,res)=>{
    cart.find({userName:req.query.userName}).then((userCartBooks)=>{
                if(userCartBooks.length>0){
                    let cartbook=userCartBooks.find((userCartBook)=>{
                        for(const key in userCartBook.book){
                            if(userCartBook.book[key]==req.query.id){
                                return userCartBook;
                            }
                        }
                    });
                    if(cartbook){
                            cart.findByIdAndUpdate(cartbook._id,{$inc:{quantity:+1},totalPrice:cartbook.book.price*(cartbook.quantity+1)}).then((result)=>{
                                if(result){
                                    res.send({message:true,cartItem:result});//object
                                }else{
                                    res.send({message:false});
                                }
                            }).catch(err=>res.send({message:err}));
                    }else{
                        res.send({message:false});
                    }
                }else{
                    res.send({message:false});
                }
            }).catch(err=>res.send({message:err}));
    
});

router.post('/dec',(req,res)=>{
    cart.find({userName:req.query.userName}).then((userCartBooks)=>{
                if(userCartBooks.length>0){
                    let cartbook=userCartBooks.find((userCartBook)=>{
                        for(const key in userCartBook.book){
                            if(userCartBook.book[key]==req.query.id){
                                return userCartBook;
                            }
                        }
                    });
                    if(cartbook){
                            cart.findByIdAndUpdate(cartbook._id,{$inc:{quantity:-1},totalPrice:cartbook.book.price*(cartbook.quantity-1)}).then((result)=>{
                                if(result){
                                    res.send({message:true,cartItem:result});//object
                                }else{
                                    res.send({message:false});
                                }
                            }).catch(err=>res.send({message:err}));
                    }else{
                        res.send({message:false});
                    }
                }else{
                    res.send({message:false});
                }
            }).catch(err=>res.send({message:err}));
    
});


module.exports=router;
var express=require('express');
var bodyParser=require('body-parser');
var books=require('../Models/book');
var category=require('../Models/category');
var author=require('../Models/author');
var router=express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
router.get('/getBooks',(req,res)=>{
        books.find({}).then((books)=>{
            if(books.length>0){
                return res.send({message:true,books:books});
            }else{
                return res.send({message:"No books to display"});
            }
        }).catch((err)=>res.send({message:err.message}));
});

router.get('/getBook/:name',(req,res)=>{
    books.find({bookName:req.params.name},function(err,book){
        if(book){
            res.send(book);
        }else{
            res.send("No books found with that name");
        }
    })
});


router.get('/getBookByCategory/:category',(req,res)=>{
    books.find({category:req.params.category}).then((books)=>{
        if(books.length>0){
            res.send({message:true,books:books});
        }else{
           res.send({message:"No books found with that Category"}); 
        }
    }).catch((err)=>res.send({message:err.message}));
        
    
});
router.get('/getBookById/:id',(req,res)=>{
    books.find({_id:req.params.id}).then((book)=>{
        if(books.length>0){
            res.send({message:true,book:book});
        }else{
           res.send({message:"No book found"}); 
        }
    }).catch((err)=>res.send({message:err.message}));
});
router.put('/updateBook',(req,res)=>{
    books.findOne({_id:req.body._id},(err,book)=>{
        if(err){
            res.send({message:"not a valid book"})
        }
        else{
            book.bookName=req.body.bookName;
            book.price=req.body.price;
            book.imageURL=req.body.imageURL;
            book.description=req.body.description;
            book.save((err)=>{
                if(err){
                    res.send({success:false,message:"Unable to Update"});
                }
                else{
                    res.send({success:true,message:"Updated Successfully"});
                }
            })
        }
    })
})
router.get('/getBookByAuthor/:author',(req,res)=>{
    books.find({author:req.params.author}).then((books)=>{
        if(books.length>0){
            res.send({message:true,books:books});
        }else{
           res.send({message:"No books found with that Author"}); 
        }
    }).catch((err)=>res.send({message:err.message}));
        
    
});
router.post('/addBook',(req,res)=>{
    var newBook=books({
        bookName:req.body.bookName,
        author:req.body.author,
        price:req.body.price,
        category:req.body.category,
        imageURL:req.body.imageURL,
        description:req.body.description,
        publishedDate:req.body.date
    });
   
    newBook.save().then((result)=>{
        if(result){
            res.send({message:true})
        }else{
            res.send({message:"couldnot save"});
        }
    }).catch(err=>res.send({message:"404 error"}));
});
router.post('/deleteBook/:id',(req,res)=>{
    books.findByIdAndRemove({_id:req.params.id}).then(()=>{
        res.send({message:true});
    }).catch(err=>res.send({message:err.message}));
});
router.post('/addCategory/:category',(req,res)=>{
    category.findOne({name:req.params.category}).then((result)=>{
        if(result){
            res.send({message:"Category already exists"});
        }else{
            var newCategory=category({name:req.params.category});
                newCategory.save().then((result)=>{
                    if(result){
                        res.send({message:true});
                    }else{
                        res.send({message:"Could not save"});
                    }
                }).catch((err)=>res.send({message:"404 error"}));
        }
    })
    
})
router.get('/getCategories',(req,res)=>{
    category.find({}).then((result)=>{
        if(result.length>0){
            res.send({message:true,categories:result});
        }else{
            res.send({message:"No Categories to display"});
        }
    }).catch((err)=>res.send({message:"404 error"}));
})
router.post('/deleteCategory/:id',(req,res)=>{
    category.findByIdAndRemove({_id:req.params.id}).then(()=>{
        res.send({message:true});
    }).catch(err=>res.send({message:err.message}));
});
router.post('/addAuthor',(req,res)=>{
    author.findOne({name:req.body.name}).then((result)=>{
        if(result){
            res.send({message:"Author already exists"});
        }else{
            var newAuthor=author({name:req.body.name,contactNo:req.body.contactNo,emailId:req.body.emailId,address:req.body.address});
                newAuthor.save().then((result)=>{
                    if(result){
                        res.send({message:true});
                    }else{
                        res.send({message:"Could not save"});
                    }
                }).catch((err)=>res.send({message:"404 error"}));
        }
    })
    
})

router.get('/getAuthors',(req,res)=>{
    author.find({}).then((result)=>{
        if(result.length>0){
            res.send({message:true,authors:result});
        }else{
            res.send({message:"No Authors to display"});
        }
    }).catch((err)=>res.send({message:"404 error"}));
})
router.post('/deleteAuthor/:id',(req,res)=>{
    author.findByIdAndRemove({_id:req.params.id}).then(()=>{
        res.send({message:true});
    }).catch(err=>res.send({message:err.message}));
});
router.get('/search/:name',(req,res)=>{
        books.find({"bookName":{$regex : `^${req.params.name}.*` , $options: 'si' }}).then((searchedBooks)=>{
            if(searchedBooks.length>0){
                res.send(searchedBooks);
            }else{
                books.find({"category":{$regex : `^${req.params.name}.*` , $options: 'si' }}).then((searchedBooks)=>{
                    if(searchedBooks.length>0){
                        res.send(searchedBooks);
                    }else{
                        books.find({"author":{$regex : `^${req.params.name}.*` , $options: 'si' }}).then((searchedBooks)=>{
                            res.send(searchedBooks);
                         }
                         ).catch((err)=>{
                             res.send(err.message);
                         });
                    }
                }).catch((err)=>{
                    res.send(err.message);
                });
            }
            
        }).catch((err)=>{
            res.send(err.message);
        });
    
  
});
module.exports=router;
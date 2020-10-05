var express=require('express');
var bodyParser=require('body-parser');
var books=require('../Models/book');
var category=require('../Models/category');
var author=require('../Models/author');
var router=express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
router.get('/getBook',(req,res)=>{
    if(req.query.name&&req.query.category){
        books.find({$and:[{author:req.query.name},{category:req.query.category}]},function(err,book){
                if(err){
                    res.send("Error in finding the book");
                }else if(book){
                    res.send(book);
                }else{
                    res.send("Book not found");
                }
        });
    }else{
        books.find({}).then((books)=>{
            if(books.length>0){
                return res.send({message:true,books:books});
            }else{
                return res.send({message:false});
            }
        }).catch((err)=>res.send({message:err}));
    }
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
    console.log(req.params.category);
    books.find({category:req.params.category}).then((books)=>{
        if(books.length>0){
            res.send({message:true,books:books});
        }else{
           res.send({message:"No books found with that Category"}); 
        }
    }).catch((err)=>res.send({message:err.message}));
        
    
});
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
        publishedDate:req.body.date
    });
   
    newBook.save(function(err,result){
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    })
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
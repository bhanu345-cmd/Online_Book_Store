var express=require('express');
var bodyParser=require('body-parser');
var books=require('../Models/book');
var category=require('../Models/category');
var author=require('../Models/author');
var router=express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
const multer = require('multer');

var storage =multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g,"-")+"_"+file.originalname);
    }
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg'||file.mimetype==='image/jpg'||file.mimetype==='image/png'||file.mimetype==='image/jfif'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};
const upload = multer({
    storage: storage,
    limits: {fieldSize:  1024*1024*5},
    fileFilter: fileFilter
});
// module.exports = function(app){
//     app.use(function(req,res,next){
//     res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token,Origin,Content-Type,Accept"
//     );
//     next();
// })
// }
router.get('/getBooks',async(req,res)=>{
        books.find({}).then((books)=>{
            if(books.length>0){
                return res.send({message:true,books:books});
            }else{
                return res.send({message:"No books to display"});
            }
        }).catch((err)=>res.send({message:err.message}));
});

router.get('/getBook/:name',async(req,res)=>{
    books.find({bookName:req.params.name},function(err,book){
        if(book){
            res.send(book);
        }else{
            res.send("No books found with that name");
        }
    })
});


router.get('/getBookByCategory/:category',async(req,res)=>{
    books.find({category:req.params.category}).then((books)=>{
        if(books.length>0){
            res.send({message:true,books:books});
        }else{
           res.send({message:"No books found with that Category"}); 
        }
    }).catch((err)=>res.send({message:err.message}));
        
    
});
router.get('/getBookById/:id',async(req,res)=>{
    books.find({_id:req.params.id}).then((book)=>{
        if(books.length>0){
            res.send({message:true,book:book});
        }else{
           res.send({message:"No book found"}); 
        }
    }).catch((err)=>res.send({message:err.message}));
});
router.put('/updateBook',upload.single('bookimg'),async(req,res)=>{
    books.findOne({_id:req.body._id},(err,book)=>{
        if(err){
            res.send({message:"not a valid book"})
        }
        else{
            book.bookName=req.body.bookName;
            book.price=req.body.price;
            book.description=req.body.description;
            book.bookimg= req.file.path;
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
router.get('/getBookByAuthor/:author',async(req,res)=>{
    books.find({author:req.params.author}).then((books)=>{
        if(books.length>0){
            res.send({message:true,books:books});
        }else{
           res.send({message:"No books found with that Author"}); 
        }
    }).catch((err)=>res.send({message:err.message}));
        
    
});
router.post('/addBook',upload.single('bookimg'),async(req,res)=>{
    // if (!req.file) {
    //     console.log("No file received or invalid file type");
    //     return res.send({
    //         message: "No file received or invalid file type",
    //         success: false
    //     });}
    var newBook=books({
        bookName:req.body.bookName,
        author:req.body.author,
        price:req.body.price,
        category:req.body.category,
        description:req.body.description,
        publishedDate:req.body.date,
        bookimg: req.file.path
    });
   
    newBook.save().then((result)=>{
        if(result){
            res.send({message:true})
        }else{
            res.send({message:"couldnot save"});
        }
    }).catch(err=>res.send({message:"404 error"}));
});
router.post('/deleteBook/:id',async(req,res)=>{
    books.findByIdAndRemove({_id:req.params.id}).then(()=>{
        res.send({message:true});
    }).catch(err=>res.send({message:err.message}));
});
router.post('/addCategory/:category',async(req,res)=>{
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
router.get('/getCategories',async(req,res)=>{
    category.find({}).then((result)=>{
        if(result.length>0){
            res.send({message:true,categories:result});
        }else{
            res.send({message:"No Categories to display"});
        }
    }).catch((err)=>res.send({message:"404 error"}));
})
router.post('/deleteCategory/:id',async(req,res)=>{
    category.findByIdAndRemove({_id:req.params.id}).then(()=>{
        res.send({message:true});
    }).catch(err=>res.send({message:err.message}));
});
router.post('/addAuthor',async(req,res)=>{
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

router.get('/getAuthors',async(req,res)=>{
    author.find({}).then((result)=>{
        if(result.length>0){
            res.send({message:true,authors:result});
        }else{
            res.send({message:"No Authors to display"});
        }
    }).catch((err)=>res.send({message:"404 error"}));
})
router.post('/deleteAuthor/:id',async(req,res)=>{
    author.findByIdAndRemove({_id:req.params.id}).then(()=>{
        res.send({message:true});
    }).catch(err=>res.send({message:err.message}));
});
router.get('/search/:name',async(req,res)=>{
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
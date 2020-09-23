var express=require('express');
var bodyParser=require('body-parser');
var books=require('../Models/book');
var cors=require('cors');
var router=express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
router.use(cors());
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
        books.find({},function(err,books){
            if(err){
                res.send("Error in finding book");
            }
            res.send(books);
        });
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

router.get('/getBook/:author',(req,res)=>{
    books.find({author:author},function(err,book){
        if(book){
            res.send(book);
        }else{
           res.send("No books found with that author"); 
        }
    })
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

module.exports=router;
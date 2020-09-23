var config=require('./config.json');
module.exports={
    getDbConnectionString:()=>{
        return 'mongodb+srv://'+config.uname+':'+config.pwd+'@bhanu.beije.mongodb.net/products?retryWrites=true&w=majority';
    }
}
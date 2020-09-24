var config=require('./config.json');
module.exports={
    getDbConnectionString:()=>{
        return 'mongodb://localhost:27017/virtualstandups';
    }
}
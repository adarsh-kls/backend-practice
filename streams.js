// const {createReadStream}=require('fs');
// const stream=createReadStream('./content/big.txt')
// stream.on('data',(result)=>{
//     console.log(result);
// })

const express=require('express');
const app=express();
app.use(function(req,res,next){
    res.send('this is the middleware')
    next();
});
app.get('/',(req,res,next)=>{
    return next(new Error('something went wrong'))
});
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send('something broke')
});
app.listen(5000)
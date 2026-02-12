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
app.get('/',(req,res)=>{
    res.send('home page')
});
app.get('/adarsh',(req,res)=>{
    res.send('adarsh page')
});
app.listen(3000)
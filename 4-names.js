const express=require('express')
const app=express();
const path=require('path');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/names/:name',(req,res)=>{
   res.send(req.params.name);
    
})

app.listen(3000,function() {
    console.log('server is running on port 3000');
})
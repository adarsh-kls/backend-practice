const express=require('express');
const app=express();
const userModel=require('./views/modules/user');
const path=require('path');


const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
app.use(express.json());
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use(cookieParser());

app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/create',async(req,res)=>{
    let {username,email,password,age}=req.body;

    let createdUser=await userModel.create({
        username,
        email,
        password:await bcrypt.hash(password,10),
        age
    });

    let token=jwt.sign({email},"secret");
    res.send(createdUser);
    res.cookie('token',token);
    
});



app.get('/logout',(req,res)=>{
    res.cookie('token','');
    res.redirect('/');
})

app.get('/login',(req,res)=>{
    res.render('login');
});

app.post('/login',async(req,res)=>{
    let user=await userModel.findOne({email:req.body.email});
    if(!user)  return res.send("User not found");
    console.log(user);
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(err) return res.send("Error while comparing password");
        if(result){
            let token=jwt.sign({email:user.email},"secret");
            res.cookie('token',token);
            res.send("Login successful");
        }else{
            res.send("Invalid password");
        }
    });

    
});
   
app.listen(3000);
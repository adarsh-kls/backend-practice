const express=require('express');
const app=express();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
app.use(express.json());
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use(cookieParser());
app.get('/',(req,res)=>{
    let token=jwt.sign({email:'test@example.com'},'secretkey');
    res.cookie('token',token,{httpOnly:true});
    res.send('Token set in cookie');
})

app.get('/protected',(req,res)=>{
    let data=jwt.verify(req.cookies.token,'secretkey');
    res.send(`Protected data for ${data.email}`);
})
    





// app.get('/',(req,res)=>{
//     bcrypt.genSalt(10,(err,salt)=>{
//         bcrypt.hash('123456',salt,(err,hash)=>{
//             bcrypt.compare('123456',hash,(err,match)=>{
//                 res.send(match);
//                 console.log(match);
//             })
//         })
//     })
// })


app.listen(3000);
const express=require('express');
const app=express();
const userModel=require('./models/user');
const postModel=require('./models/post');
const cookieParser=require('cookie-parser');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.render("index");
});

app.get('/profile',isloggedIn,async (req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate("posts");
    res.render("profile",{user});
});

app.post('/post',isloggedIn,async (req,res)=>{
    let user=await userModel.findOne({email:req.user.email});
    let{content}=req.body;
    let post=await postModel.create({
        user:user._id,
        content:content
    });

    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
});

app.post('/register',async(req,res)=>{
     let {name,email,age,password,username}=req.body;
    let user=await userModel.findOne({email});
    if(user) return res.status(500).send("User already exists");

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            let user=await userModel.create({
                username,
                name,
                age,
                email,
                password:hash
            })

            let token=jwt.sign({email:email,userId:user._id},"secretkey");
            res.cookie("token",token);
            res.send("registered");

        })
    })

    
});
app.get('/login', (req,res)=>{
    res.render("login");
});


app.post('/login',async(req,res)=>{
    let {email,password}=req.body;
    let user=await userModel.findOne({email});
    if(!user) return res.status(500).send("User does not exist");

    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token=jwt.sign({email:email,userId:user._id},"secretkey");
            res.cookie("token",token);
            res.redirect('/profile');
        } else {
            res.status(500).send("Invalid credentials");
        }
    })

    

});

app.get('/logout',(req,res)=>{
    res.clearCookie("token");
    res.redirect('/login');
})

function isloggedIn(req,res,next){

    if(!req.cookies.token){
        return res.redirect('/login');
    }

    try{
        let data = jwt.verify(req.cookies.token,"secretkey");
        req.user = data;
        next();
    }
    catch(err){
        return res.redirect('/login');
    }

}

app.listen(3000);
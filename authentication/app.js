const express=require("express");
const app=express();
const userModel=require('./views/modules/user');
const postModel=require('./views/modules/post');

app.get('/',async(req,res)=>{
    let user=await userModel.create({
        username:"John Doe",
        age:38,
        email:"johndoe@example.com",
        posts:[]
    })

    res.send(user);
})

app.get("/create",async(req,res)=>{

})

app.get("/post/create",async(req,res)=>{
    let user=await userModel.findOne({_id:"69ad81c088c4a2a684345302"});
    let post=await postModel.create({
        postdata:"This is a post",
        user:user._id

    })

    user.posts.push(post._id);
    await user.save();
    res.send({post,user});
})

app.listen(3000);
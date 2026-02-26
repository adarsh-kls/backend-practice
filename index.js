const express=require('express')
const app=express();
const Path=require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(Path.join(__dirname,"public")));

app.get('/',function(req,res) {
    res.render('index');
})

app.listen(5000, function() {
    console.log("server is running on port 5000");
})
const express=require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const {Signup, Comment} = require('./models')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const path = require('path');
dotenv.config()
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection open");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
} 
app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static('public'));

app.get('/signup', (req, res)=>{
    
    res.sendFile(__dirname+"/public/Signup.html");
})

app.get('/login', (req, res)=>{
    
  res.sendFile(__dirname+"/public/login.html");
})

app.post('/signup',async (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/Signup.html'));
    try{
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      
      const newUser = await Signup.create({
          name:req.body.name,
          email: req.body.email,
          password: hashedPassword
  
      })

      const user = await newUser.save()
      res.status(200).json(user) 
  } catch(err){
      console.log(err);
  }
  try{
    
    const newComment = await Comment.create({
        name:req.body.name,
        email: req.body.email,
        comment: req.body.comment

    })

    const comment = await newComment.save()
    res.status(200).json(comment) 
} catch(err){
    console.log(err);
}
   
    res.sendFile(__dirname+"/public/index.html")
})

app.post('/login',async (req, res)=>{
  try{
    const user = await Signup.findOne({email: req.body.email})
    !user && res.status(404).json("User not found")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("invalid password")
    
    res.sendFile(__dirname+"/public/index.html")
    
} catch(err){
    console.log(err);
}

// res.status(206).send("ok")
})




app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})
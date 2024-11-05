const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path  = require('path')
const port = 4000

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))


mongoose.connect('mongodb+srv://LearnerId:LearnerId@cluster0.p2ojj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
const db = mongoose.connection
db.once('open',()=>{
    console.log("mongodb connection success!")
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ }, // Basic email validation
  PhoneNumber: { type: String, required: true, match: /^\d{10}$/ }, // Example for 10-digit phone number
  Location: { type: String, required: true },
  query: { type: String, required: true }
})
const Users = mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/post',async(req,res)=>{
  
  const {name,email,PhoneNumber,Location,query} = req.body;

  const user = new Users({
    name,
    email,
    PhoneNumber,
    Location,
    query
  })
  await user.save()
  console.log(user)
  res.send("Form Submitted");
})


app.listen(port,()=>{
    console.log("Server is Running")
})

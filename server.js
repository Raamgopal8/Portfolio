require('dotenv').config();
const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<!DOCTYPE html>`);
const document = dom.window.document;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT ;
const path  = require('path')


const app = express();
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
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
    res.sendFile(path.join(__dirname,'Public','index.html'))
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
  res.sendFile(path.join(__dirname,'Public','index.html'))
})


app.listen(port,()=>{
    console.log("Server is Running")
})

//end of the code 
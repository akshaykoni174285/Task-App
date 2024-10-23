import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRouter from '../src/routers/user.js'
// import mongoose from 'mongoose'
import taskRouter from '../src/routers/task.js';
import './db/mongoose.js';
import auth from './middleware/auth.js'
import bcrypt from 'bcrypt'



const app = express()
const port  = process.env.PORT || 3000

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


// need to use the middleware for the authenticatin 

// to use the user router 

// api for the home page
app.get('/', (req, res)=>{
    console.log("home page")
    res.send('<h1>hello and welcome to home page</h1>')
})

// api's related to the user endpoint
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () =>{
    console.log("listinging to port :" ,port)
})


import jwt from 'jsonwebtoken';

const myFunction = async()=>{
    // using sign function 
    const token = jwt.sign({_id:"abc123"},"invincibleunderthesun",{expiresIn: '2 days'})
    // console.log(token)
    // first base64 
    // second is payload which we passed id 
    // signature for verification
    const res = await jwt.verify(token,"invincibleunderthesun")
    // console.log(res);
}

myFunction();
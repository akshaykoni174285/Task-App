import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRouter from '../src/routers/user.js'
// import mongoose from 'mongoose'
import taskRouter from '../src/routers/task.js';
import './db/mongoose.js';

import bcrypt from 'bcrypt'



const app = express()
const port  = process.env.PORT || 3000

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))



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
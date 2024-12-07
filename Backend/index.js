import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRouter from './routers/user.js'
// import mongoose from 'mongoose'
import taskRouter from './routers/task.js';
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

import {Task} from './models/task.js'
const main = async()=>{ 
    const task = await Task.findById('67509412d25a73f13c34d423');
    console.log(task)
    await task.populate('owner')
    console.log(task.owner)
}

main()

 
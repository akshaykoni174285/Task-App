import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRouter from './routers/user.js'
// import mongoose from 'mongoose'
import taskRouter from './routers/task.js';
import './db/mongoose.js';
import auth from './middleware/auth.js'
import bcrypt from 'bcrypt'
import path from 'path';
import { fileURLToPath } from 'url';


const app = express()
const port  = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const publicDir = path.join(__dirname, '..', 'frontend', 'public');

app.use(express.static(path.join(publicDir)));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


// need to use the middleware for the authenticatin 

// to use the user router 

// api for the home page
app.get('/', (req, res)=>{
    console.log("home page")
    res.sendFile(path.join(publicDir,'index.html'));
})

// api's related to the user endpoint
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () =>{
    console.log("listinging to port :" ,port)
})

import {Task} from './models/task.js'
import {User} from './models/user.js'

const main = async()=>{ 
    // const task = await Task.findById('67509412d25a73f13c34d423');
    // console.log(task)
    // await task.populate('owner')
    // console.log(task.owner)
    const user = await User.findById('675091ef229655043505353d');
    console.log(user)
    await user.populate('tasks') 
    console.log(user.tasks)


}

main()

 
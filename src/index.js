import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
// import mongoose from 'mongoose'
import './db/mongoose.js';
import Joi from 'joi'
import {User, userSchema} from '../src/models/user.js'

const app = express()
const port  = process.env.PORT || 3000

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/', (req, res)=>{
    console.log("home page")
    res.send('<h1>hello and welcome to home page</h1>')
})

app.post('/users', (req, res)=>{
    // res.send("testing")
    console.log(req.body)
    const {error, value } = userSchema.validate(req.body);
    if (error){
        console.log(value)
    }
    // console.log(value)
    const user  = new User(value)
    user.save()
        .then((user) => res.send(user))
        .catch(error =>{
            console.log("error",error);
        })
    console.log(user);
    // const user = new User(result)
    // console.log(user)
})

app.listen(port, () =>{
    console.log("listinging to port :" ,port)
})
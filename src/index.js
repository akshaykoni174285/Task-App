import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
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
    res.send("testing")
    console.log(req.body)
    const {err, result } = userSchema.validate(req.body);
    if (err){
        console.log(err)
    }
    console.log(result)
    const user = new User(result)
    console.log(user)
})

app.listen(port, () =>{
    console.log("listinging to port :" ,port)
})
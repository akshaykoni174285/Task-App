import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
// import mongoose from 'mongoose'
import './db/mongoose.js';
import Joi from 'joi'
import {User, userSchema} from '../src/models/user.js'
import {Task, taskSchema} from '../src/models/task.js'
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
        console.log("error", error)
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


app.post('/tasks',(req, res) =>{
    console.log(req.body)

    const {error, value} = taskSchema.validate(req.body)
    if(error){
        console.log("error", error)
        
    }
    const task = new Task(value)
    task.save()
        .then(task=>{
            console.log("saving task doc")
            res.send(task)

        })
        .catch(err=>{
            console.log("error while inserting the doc")
        })
})
app.get('/users',(req, res) =>{
    User.find({})
        .then(users=>{
            res.send(users);
        })
        .catch(err=>{
            console.log("unable to send the users datra");
        })
})
app.get('/users/:id',(req, res)=>{
    const id = req.params.id
    User.findOne({'_id':id})
        .then(user=>{
            res.send(user).status(200)

        })
        .catch(err=>{
            console.log("error in finding the doc")
        })
    console.log(req.params.id)
})

app.listen(port, () =>{
    console.log("listinging to port :" ,port)
})
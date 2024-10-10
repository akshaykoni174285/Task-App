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

app.post('/users', async(req, res)=>{
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
app.get('/users', async(req, res) =>{
    try{
        const users = await User.find({})
        res.send(users)
    }
    catch(e){
        console.log("unable to get the data",e)
    }
    
        // .then(users=>{
        //     res.send(users);
        // })
        // .catch(err=>{
        //     console.log("unable to get the users data");
        // })


})
app.get('/users/:id',(req, res)=>{
    const id = req.params.id
    User.findOne({'_id':id})
        .then(user=>{
            if(!user){
                return res.status(404).send()
            }

            res.send(user).status(200)

        })
        .catch(err=>{
            console.log("error in finding the doc")
        })
    console.log(req.params.id)
})


app.patch('/users/:id',async(req,res)=>{

    try{
        const {error, value } = userSchema.validate(req.body);
        console.log(value)
        
        const user  = await User.findByIdAndUpdate(req.params.id, value,{new:true})

        res.send(user);
        console.log(user)
    }
    catch(e){
        console.log("error while updating the document", e)
    }

    
})


app.get('/tasks',(req,res)=>{
    Task.find({})
        .then(tasks=>{
            if(!tasks){
                return res.status(404).send()
            }
            res.send(tasks)
        })
        .catch(error=>{
            console.log("unable to get the all the tasks")
        })
})

// app.get('/tasks/:id',(req,res)=>{
//     const id  = req.params.id
//     console.log(id)
//     Task.findOne({'_id':id})
//         .then(task=>{
//             if(!task){
//                 return res.status(404).send()
//             }

//             res.send(task).status(200)

//         })
//         .catch(err=>{
//             console.log("error in finding the doc",err)
//         })

// })

// task api to remove a given task by id and then get the incompleted task details


app.get('/tasks/:id',(req,res)=>{
    const id = req.params.id
    Task.findOneAndDelete(id)
        .then(task=>{
                console.log(task)
                return Task.find({'completed':false})
        })
        .then(tasks=>{
            res.send(tasks)
        })
        .catch(err=>{
            console.log("error while processing", err)
        })
})

app.listen(port, () =>{
    console.log("listinging to port :" ,port)
})
import express from 'express';
import {Task, taskSchema} from '../models/task.js'


const router = express.Router();





// creating user 
router.post('/tasks',(req, res) =>{
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



// get all users




router.patch('/tasks/:id', async (req, res) => {

    try {
        const {error, value} = taskSchema.validate(req.body)
        console.log(value)
       
        const task = await Task.findByIdAndUpdate(req.params.id, value, {new:true})
        res.send(task)
    } catch (error) {
        res.send("error").status(400)
        console.log(error)
        
    }

})

// get all tasks 
router.get('/tasks',(req,res)=>{
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

router.get('/tasks/:id',(req,res)=>{
    const id  = req.params.id
    console.log(id)
    Task.findOne({'_id':id})
        .then(task=>{
            if(!task){
                return res.status(404).send()
            }

            res.send(task).status(200)

        })
        .catch(err=>{
            console.log("error in finding the doc",err)
        })

})


router.delete('/tasks/:id', async(req, res) => {
    try {
        console.log(req.params.id)
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.send('task not found').status(404)
        }
        res.send('task deleted successfully').status(200)
    } catch (erorr) {
        res.send('something went wrong').status(500)
        
    }
}
)

// task api to remove a given task by id and then get the incompleted task details

// get tasks by its id
// app.get('/tasks/:id',(req,res)=>{
//     const id = req.params.id
//     Task.findOneAndDelete(id)
//         .then(task=>{
//                 console.log(task)
//                 return Task.find({'completed':false})
//         })
//         .then(tasks=>{
//             res.send(tasks)
//         })
//         .catch(err=>{
//             console.log("error while processing", err)
//         })
// })


export default router;
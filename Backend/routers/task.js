import express from 'express';
import {Task, taskSchema} from '../models/task.js'
import auth from '../middleware/auth.js'



const router = express.Router();





// creating user 
router.post('/tasks',auth,(req, res) =>{
    console.log(req.body)
    console.log(req.user)
    const {error, value} = taskSchema.validate(req.body)
    if(error){
        console.log("error", error)
        
    }
    const task = new Task({
        ...value,
        owner: req.user._id
    })
    task.save()
        .then(task=>{
            console.log("saving task doc")
            res.send(task)

        })
        .catch(err=>{
            console.log("error while inserting the doc")
        })
})

router.patch('/tasks/:id',auth, async (req, res) => {

    try {
        const {error, value} = taskSchema.validate(req.body)
        console.log(value)
       
        const task = await Task.findByIdAndUpdate({_id:req.params.id, owner:req.user._id}, value,{ new: true, runValidators: true })
        res.send(task)
    } catch (error) {
        res.send("error").status(400)
        console.log(error)
        
    }

})

// get all tasks 
router.get('/tasks',auth,async (req,res)=>{
    // Task.find({owner:req.user._id}) 
    //     .then(tasks=>{
    //         if(!tasks){
    //             return res.status(404).send('not task found for this user')
    //         }
    //         res.send(tasks)
    //     })
    //     .catch(error=>{
    //         console.log("unable to get the all the tasks")
    //     })
    try {
        await req.user.populate('tasks')
      
        res.send(req.user.tasks).status(200)
        
    } catch (error) {
        res.status(500).send('somethig went wrong')
    }
})

router.get('/tasks/:id',auth,(req,res)=>{
    const _id  = req.params.id
    console.log(_id)
    const task = Task.findOne({_id,owner:req.user._id})
        .then(task=>{
            if(!task){
                return res.status(404).send("no task found")
            }

            res.send(task).status(200)

        })
        .catch(err=>{
            console.log("error in finding the doc",err)
        })

})


router.delete('/tasks/:id',auth, async(req, res) => {
    try {
        console.log(req.params.id)
        // const task = await Task.findByIdAndDelete({_id:req.params.id, owner:req.user._id})
        const task = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})
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
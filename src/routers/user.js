import express from 'express';
import Joi from 'joi'
import {User, userSchema} from '../models/user.js'
const router = new express.Router();


// add a new user 
router.post('/users', async(req, res)=>{
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

// get all users 
router.get('/users', async(req, res) =>{
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

// get user by its id 
router.get('/users/:id',(req, res)=>{
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


// update a user info using id 
router.patch('/users/:id',async(req,res)=>{

    try{
        const {error, value } = userSchema.validate(req.body);
        console.log(value)
        if(error){
            return res.send("error while patching")
        }
        
        const user  = await User.findByIdAndUpdate(req.params.id, value,{new:true})

        res.send(user);
        console.log(user)
    }
    catch(e){
        console.log("error while updating the document", e)
    }

    
})

// delte a user by its id 
router.delete('/users/:id', async(req, res) => {
    try {
        console.log(req.params.id)
        const user = await User.findByIdAndDelete(req.params.id)
        console.log(res)
        if(!user){
            return res.send('user not found').status(404)
        }
        res.send('user deleted successfully').status(200)
    } catch (erorr) {
        res.send('something went wrong').status(500)
        
    }
}
)

export default router;
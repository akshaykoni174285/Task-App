import express from 'express';
import Joi from 'joi'
import {User, userSchema} from '../models/user.js'
const router = new express.Router();
import auth from '../middleware/auth.js'


// add a new user 
router.post('/users', async(req, res)=>{
    // res.send("testing")
    try{
    console.log(req.body)
    const {error, value } = userSchema.validate(req.body);
    if (error){
        console.log("error", error)
        res.status(500).send()
    }
    // console.log(value)
    const user  = new User(value)
    

    await user.save()
    const jwtToken = await user.getAuthToken()
    res.send({user, jwtToken});
    }catch(error){
        res.status(400).send("unable to signup")
        console.log(error)
    }
    // console.log(user);
   
    // const user = new User(result)
    // console.log(user)
})

router.post('/user/login',async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        const jwtToken = await user.getAuthToken();
        res.send({user,jwtToken}); 
        console.log("login sucessfully")
    } catch (error) {
        res.status(400).send()
        console.log(error);
    }
})

// get all users 
router.get('/users',auth,async(req, res) =>{
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
        // added for the testing by the id 
    // console.log(req.params.id)
})


// update a user info using id 
router.patch('/users/:id',async(req,res)=>{
    const updates = Object.keys(req.body)


    try{
        const user  = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update]
        )

        // const {error, value } = userSchema.validate(req.body);
        // console.log(value)
        // if(error){
        //     return res.send("error while patching")
        // }
        
        // const user  = await User.findByIdAndUpdate(req.params.id, req.body,{new:true})
        await user.save()
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
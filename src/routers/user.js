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
        res.status(400).send({error:"unable to login"})
        console.log(error);
    }
})

router.post('/user/logout',auth, async(req,res)=>{
    try{console.log(req.user)
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })
        await req.user.save();
        res.send({message:"sucessfully logged out"}).status(201)
    }catch(error){
        console.log(error);
        res.status(400).send({msg:"unable to log out"})
    }
})

router.post('/user/logoutALL', auth, async(req,res)=>{
    try {
        req.user.tokens = []
        req.user.save();
        res.send({response:"the user has been logged out from all devices.."}).status(200)
        
    } catch (error) {
        res.send({error}).status(400);
        
    }
})

// get all users 
router.get('/users/me', async (req, res) => {
    try {
        const users = await User.find({});
        const result = users.map(user => user.toJSON()); // Apply toJSON on each user
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send(error);
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// get user by its id 


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
router.delete('/users/me',auth, async(req, res) => {
    try {
        await req.user.remove();
        res.send(req.user)
    } catch (erorr) {
        res.send('something went wrong').status(500)
        
    }
}
)

export default router;
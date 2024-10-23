import jwt from 'jsonwebtoken'
import {User} from '../models/user.js'



export default async(req,res,next)=>{
    try {
        const token = req.headers.authorization.replace("Bearer ","");
        const decoded = jwt.verify(token,"invincibleunderthesun")
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})

        if(!user){
            throw new Error()
            // res.send({res:"couldnt find the user"})
        }
        // console.log(userobject);
        // console.log(user)
        req.token = token;
        req.user = user;
        next();
        // console.log(decoded);
    } catch (error) {
        res.send({error:"please authenticate"})
        console.log(error)
    }

}


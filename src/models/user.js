import mongoose from "mongoose";
import Joi from "joi";
import MongoDB from "mongodb"
import jwt from "jsonwebtoken"; 

import bcrypt from "bcrypt";



const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
});
user_schema.methods.getAuthToken = async function(){

    const user = this;
    const token = jwt.sign({_id: user._id.toString()},"invincibleunderthesun");
    user.tokens = user.tokens.concat({token})
    await user.save();
    return token;
}
user_schema.methods.toJSON = function(){
    const user = this;
    const userObjec = user.toObject();
    delete userObjec.tokens;
    delete userObjec.password;
    return userObjec
}


user_schema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email})

    if(!user){
        throw new Error("unable to login")

    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error("unable to login")
    }

    return user;
}

user_schema.pre('save', async function (next) {
    const user = this; // `this` refers to the document being saved

    // Hash the password if it is new or has been modified
    if (user.isModified('password')) {
        try {
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
        } catch (error) {
            return next(error); // Handle error if password hashing fails
        }
    }
    
    next(); // Call next() to proceed with saving
});
// user_schema.pre('findByIdAndUpdate', async function (next) {
//     const update = this.getUpdate();

//     // Check if the password is being updated
//     if (update.password) {
//         try {
//             const saltRounds = 10;
//             update.password = await bcrypt.hash(update.password, saltRounds);
//         } catch (error) {
//             return next(error);
//         }
//     }
//     console.log("calling second middleware")
//     next();
// });

export const User = mongoose.model('users', user_schema);

export const userSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().min(0).optional(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required()
});

export default {User, userSchema};
import mongoose from "mongoose";
import Joi from "joi";
import MongoDB from "mongodb"

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
        required: true
    },
    password: {
        type: String,
    }
});

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
    console.log("calling middleware")

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


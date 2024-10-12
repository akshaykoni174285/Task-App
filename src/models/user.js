import mongoose from "mongoose";
import Joi from "joi";


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

export const User = mongoose.model('users', user_schema);

export const userSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().min(0).optional(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string()
});


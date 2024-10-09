import Joi from "joi"
import mongoose from "mongoose"






const task_schema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});


export const Task = mongoose.model('tasks', task_schema);



export const taskSchema = Joi.object({
    description: Joi.string().required(),
    completed: Joi.boolean() // Ensure completed is required if you always want it
});
import mongoose from "mongoose";
import Joi from "joi";

const connectionurl = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionurl)
    .then(() => {
        console.log("Connected to db");
        Insertindoc(sample_task, sample_user);
    })
    .catch(err => {
        console.log("Error connecting to db:", err);
    });

const sample_task = {
    description: "clean the room",
    completed: true,
};

const sample_user = {
    name: '   akshay   ',
    age: 23,
    email: "akshaykoni174285@gmail.com"
};

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

const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Task = mongoose.model('tasks', task_schema);
const User = mongoose.model('users', user_schema);

const joitaskSchema = Joi.object({
    description: Joi.string().required(),
    completed: Joi.boolean() // Ensure completed is required if you always want it
});

const joiuserSchema = Joi.object({
    name: Joi.string().trim().required(),
    age: Joi.number().min(0).required(),
    email: Joi.string().email().lowercase().required(),
    password: Jo.string().password().trim().required()
});

async function Insertindoc(taskdata, userdata) {
    // Validate user data
    const { error: userError, value: userValue } = joiuserSchema.validate(userdata);
    if (userError) {
        console.log('Error while validating user:', userError.details[0].message);
        return; // Exit if there's an error
    }

    // Validate task data
    const { error: taskError, value: taskValue } = joitaskSchema.validate(taskdata);
    if (taskError) {
        console.log('Error while validating task:', taskError.details[0].message);
        return; // Exit if there's an error
    }

    // Save validated user data
    const user = new User(userValue);
    try {
        const savedUser = await user.save();
        console.log('User saved:', savedUser);
    } catch (err) {
        console.log("Error while inserting user doc:", err);
    }

    // Save validated task data
    const task = new Task(taskValue);
    try {
        const savedTask = await task.save();
        console.log('Task saved:', savedTask);
    } catch (err) {
        console.log("Error while inserting task doc:", err);
    }
}

// Uncomment this section to run the script
// mongoose.connect(connectionurl)
//     .then(() => {
//         console.log("Connected to db");
//         Insertindoc(sample_task, sample_user);
//     })
//     .catch(err => {
//         console.log("Error connecting to db:", err);
//     });
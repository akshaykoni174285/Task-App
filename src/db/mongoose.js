import mongoose from "mongoose";
import mongodb from "mongodb";
import joi from "joi";



const connectionurl = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionurl)
    .then(() => {console.log("connected to mongoDB")})
    .catch((error) => {console.log(error)})

mongoose.connect

// we will be using user model and create a model in mongoose to
// we can create a schema and then pass it when creating model

// const Task_schema = new mongoose.Schema({description: String, completed: Boolean})
// const Task = mongoose.model('Tasks',Task_schema)

// const newTask = new Task({description:"clean the room", completed: false});

// newTask.save()
//     .then(doc => {
//         console.log(doc)
//         mongoose.connection.close()
//     })
//     .catch(err =>{
//         console.log("error while inserting",err)
//         mongoose.connection.close();
//     })

const User_schema = joi.object({
    name: joi.string(),

    age: joi.number()
        .min(0)
})


const User = new mongoose.model('users',User_schema)

const userData = {
  name: 'Akshay',
  age: 23,
};


const newuser  = new User({name: "Akshay" ,age:24})

const validateUser = user.validate(newuser);

if (validationResult.error) {
  // If validation fails, print the error message
  console.error('Validation error:', validationResult.error.details[0].message);
} else {
  // If validation passes

  const NewUser = new User(userData)

    NewUser.save()
        .then(doc =>{
            console.log("saving the document")
            mongoose.connection.close()
        })
        .catch(error =>{
            console.log("error while inserting the document")
            mongoose.connection.close()
        })
}


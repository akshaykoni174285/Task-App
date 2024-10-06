import mongoose from "mongoose";
import mongodb from "mongodb";
import Joi from "joi";



const connectionurl = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionurl)
    .then(() => {console.log("connected to mongoDB")
        createUser(sampleUserData)
    })
    .catch((error) => {console.log(error)})



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

// const User_schema = joi.object({
//     name: joi.string(),

//     age: joi.number()
//         .min(0)
// })

const userSchema = new mongoose.Schema({
  name:{},
  age:{},
  email:{}
});

// Step 2: Create the Mongoose Model for the User
const User = mongoose.model('users', userSchema);

// Step 3: Define the Joi Validation Schema for the User
const joiUserSchema = Joi.object({
  name: Joi.string().trim().required(),
  age: Joi.number().integer().min(0).required(),
  email: Joi.string().email().min(0).lowercase().required()
});

// Step 4: Function to Validate User Data Using Joi and Save Using Mongoose
async function createUser(userData) {
  // Validate the data with Joi
  const { error, value} = joiUserSchema.validate(userData);
  
  if (error) {
    // If Joi validation fails, return the error
    console.error('Joi Validation Error:', error.details[0].message);
    return;
  }

  // If validation passes, create and save the user with Mongoose
  const user = new User(value);
  user.save()
    .then(doc => {
        console.log(doc)
        mongoose.connection.close()
    })
    .catch(err=>{
        console.log("error while inserting the doc",err)
        mongoose.connection.close()
    })


  
//   try {
//     const savedUser = await user.save();
//     console.log('User saved:', savedUser);
//   } catch (err) {
//     console.error('Error saving user:', err);
//   }
}

// Step 5: Sample User Data to Validate and Insert
const sampleUserData = {
  name: '        Akshay joi      ',
  age: 23,
  email: 'akshaykoni@test.com'
};
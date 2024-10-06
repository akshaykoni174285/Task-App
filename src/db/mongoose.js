import mongoose from "mongoose";
import mongodb from "mongodb";


const connectionurl = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionurl)
    .then(() => {console.log("connected to mongoDB")})
    .catch((error) => {console.log(error)})

mongoose.connect

// we will be using user model and create a model in mongoose to
// we can create a schema and then pass it when creating model

const User_schema = new mongoose.Schema({name: String, age: Number})
const User = mongoose.model('User',User_schema)

const newuser  = new User({name: "Akshay", age: '23'})


newuser.save()
    .then(doc => {console.log(doc)
        mongoose.connection.close()
    }
    )
    .catch((error) => {
        console.log(('error while inserting',error));
        mongoose.connection.close()
    })

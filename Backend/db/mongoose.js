import mongoose from "mongoose";
import Joi from "joi";

const connectionurl = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionurl)
    .then(() => {
        console.log("Connected to mongoDB");
        
    })
    .catch(err => {
        console.log("Error connecting to db:", err);
    });




export default mongoose;
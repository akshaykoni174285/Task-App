import { MongoClient, ObjectId } from "mongodb";

const connectionURL = "mongodb://localhost:27017";

const databaseName = "task-manager";



const client = new MongoClient(connectionURL)

try{
    await client.connect();
    console.log("connected to mongodb");
    const db = client.db(databaseName)
    const collection = db.collection('users')

    // const res = await collection.findOne({name:"akshay"})
    const res = await collection.find({}).toArray();
    console.log(res)

    // const id = new ObjectId();
    // console.log(id)
    
}

catch(error){
    console.log("error connecting to mongod")
}


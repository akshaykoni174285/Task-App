
import {MongoClient} from 'mongodb'



const connectionURL = "mongodb://localhost:27017";

const databaseName = "task-manager";



const client = new MongoClient(connectionURL)

try{
    await client.connect();
    console.log("connected to mongodb");
    const db = client.db(databaseName)
    const collection = db.collection('users')
    const result = await collection.insertOne({name:'akshay',age:20});
    
    console.log("inserted doc",result.insertedId)

}
catch(error){
    console.log("error connecting to mongod")
}


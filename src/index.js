import express from 'express'
import bodyParser from 'body-parser'


const app = express()
const port  = process.env.PORT || 3000

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/', (req, res)=>{
    console.log("home page")
    res.send('<h1>hello and welcome to home page</h1>')
})

app.post('/users', (req, res)=>{
    res.send("testing")
    console.log(req.body)
})

app.listen(port, () =>{
    console.log("listinging to port :" ,port)
})
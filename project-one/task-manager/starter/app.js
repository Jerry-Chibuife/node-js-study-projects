const express = require('express')
const app = express()

const connectDB = require('../starter/db/connection')
require('dotenv').config()

const port = process.env.PORT || 3000
const tasks = require('./routes/tasks')
const notFound = require("./middleware/not-found");
const errorHandler = require('./middleware/error_handler')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('./public'))

app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandler)

const start = async ()=> {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
            console.log(`Server listening on port ${port}...`)
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        })
    } catch (err) {
        console.log(err)
    }
}

start().then(()=> console.log('Connected to cloud database'))

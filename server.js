const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

// urlencoded tells express to extract data from a form & add it
// to the body property on the request object
app.use(express.urlencoded({ extended: true }))


// mongodb+srv://vishalicious213_db_user:9aPRILVehFopzIju@cluster0.4srl9qn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// MongoClient.connect('mongodb+srv://vishalicious213_db_user:9aPRILVehFopzIju@cluster0.4srl9qn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', (err, client) => {
//     console.log("Mongo connected to database")
// })

MongoClient.connect('mongodb+srv://vishalicious213_db_user:9aPRILVehFopzIju@cluster0.4srl9qn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(
    console.log("Connected to database")
).catch(error => console.error(error))


app.listen(3000, function () {
    console.log('Listening on port 3000')
})

app.get("/", (req, res) => {
    // res.send("Hello World")
    res.sendFile(__dirname + `/index.html`)
})

app.post("/quotes", (req, res) => {
    console.log("Posting to /quotes")
    console.log(req.body)
})

// console.log("May Node be with you")
// console.log(__dirname)
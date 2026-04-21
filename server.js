const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

// urlencoded tells express to extract data from a form & add it
// to the body property on the request object
app.use(express.urlencoded({ extended: true }))

MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4srl9qn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(client => {
        console.log('Connected to database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
        // app.use(/* ... */)
        // app.get(/* ... */)
        // app.post(/* ... */)
        // app.listen(/* ... */)
    })
    .catch(error => console.error(error))


app.listen(3000, () => {
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
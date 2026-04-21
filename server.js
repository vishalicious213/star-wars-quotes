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

        app.post("/quotes", (req, res) => {
            console.log("Posting to /quotes")
            console.log(req.body)

            quotesCollection
                .insertOne(req.body)
                .then(result => {
                    console.log("Quote saved to database", result)
                    res.redirect("/")
                })
                .catch(error => console.error(error))
        })

        app.listen(3000, () => {
            console.log('Listening on port 3000')
        })

        app.get("/", (req, res) => {
            const cursor = db.collection('quotes').find().toArray()

            cursor
                .then(results => console.log(results))
                .catch(error => console.error(error))

            res.sendFile(__dirname + `/index.html`)
        })
    })
    .catch(error => console.error(error))
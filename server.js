const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

// set EJS as the view engine for rendering templates
app.set('view engine', 'ejs')
// urlencoded tells express to extract data from a form & add it
// to the body property on the request object
app.use(express.urlencoded({ extended: true }))
// static tells express to serve files from the public folder
app.use(express.static('public'))
// json tells express to extract JSON data from the body of a
// request & add it to the body property on the request object
app.use(express.json())

MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4srl9qn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(client => {
        // console.log('Connected to database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')

        app.post("/quotes", (req, res) => {
            // console.log("Posting to /quotes")
            console.log(req.body)

            quotesCollection
                .insertOne(req.body)
                .then(result => {
                    // console.log("Quote saved to database", result)
                    res.redirect("/")
                })
                .catch(error => console.error(error))
        })

        app.get("/", (req, res) => {
            db.collection('quotes')
                .find()
                .toArray()
                .then(results => res.render('index.ejs', { quotes: results }))
                .catch(error => console.error(error))
            })
            // res.sendFile(__dirname + `/index.html`)

        app.put('/quotes', (req, res) => {
            // console.log(req.body)

            quotesCollection
                .findOneAndUpdate(
                    { name: 'Yoda' },
                    { $set: { name: req.body.name, quote: req.body.quote } },
                    { upsert: true }
                )
                .then(result => {
                    res.json('Success')
                    // console.log(result)
                })
                .catch(error => console.error(error))
        })

        app.delete('/quotes', (req, res) => {
            // console.log(req.body)
            quotesCollection
                .deleteOne({ name: req.body.name })
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json('No quote to delete')
                    }
                    res.json('Deleted Darth Vader quote')
                    // console.log(result)
                })
                .catch(error => console.error(error))
        })


        app.listen(3000, () => {
            console.log('Listening on port 3000')
        })
    })
    .catch(error => console.error(error))
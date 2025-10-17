const express = require('express')
const app = express()

// urlencoded tells express to extract data from a form & add it
// to the body property on the request object
app.use(express.urlencoded({ extended: true }))

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
require('dotenv').config()
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const port = process.env.PORT || 3001
const bodyParser = require('body-parser')
let db

MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
    db = client.db('things')
    console.log("DB connected")
})

let router = express.Router()
router.use(bodyParser.json())
router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' })
})
router.get('/image', (req, res) => {
    let fileName = req.query.name
    res.sendFile(
        fileName,
        {
            root: __dirname + "/public/images/",
            headers: {
                "Cache-Control": "max-age=60, public",
                "Content-Type": "image/png"
            }
        }
    )
})
router.post('/todos', (req, res) => {
    console.log(req.body)
    db.collection('todos').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('todo saved')
        res.json(result.ops[0])
    })
})
app.use('/api', router)
app.use(bodyParser.json())

app.post('/multi/InvCont/findByContainerRefs', function (req, res) {
    console.log(req.headers)
    res.json({ headers: req.headers })
})

app.listen(port)
console.log('Magic happens on port ' + port)
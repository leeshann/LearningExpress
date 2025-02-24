const express = require('express')
const path = require('path')
const app = express()

const products = require('./routes/products')
const people = require('./routes/people.js')

//this is middleware
app.use(express.static('./methods-public'))

//this middleware creates a req.body object that is now accessible within your method for form values
app.use(express.urlencoded({ extended: false }))

//parses incoming post request that has application/json format for app.post('/api/people')
app.use(express.json())

//use products.js in the routes folder that stores all the endpoints for /api/products/.... in one file
app.use('/api/products', products)

//use people.js in the routes folder that stores all the endpoints for /api/people/.... in one file
app.use('/api/people', people)

//traditional form submission from form.html
app.get('/form', (req, res) => {
    res.sendFile(path.resolve('methods-public', 'form.html'))
})

//post request using traditional form submission from form.html
app.post('/login', (req, res) => {
    const {name} = req.body
    if(name.length !== 0) {
        res.status(200).send(`Welcome, ${name}`)
    } else {
        res.status(401).send("Please provide a name")
    }
})

app.get('/', (req, res) => {
    res.send("<h1>Home</h1> <a href='/api/products'>Click here for a list of all products</a>")
})


app.listen(3089, () => console.log("Server is listening on port 3089..."))

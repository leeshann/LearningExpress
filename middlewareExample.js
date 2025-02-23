// # 1 --> 
// request comes in => middleware functionality that does something => response sent back

const app = require('express')()

//MIDDLEWARE
const logger = require('./logger')
const authorize = require('./authorize')
//

// # 3 -->
// still needs to be imported but this applies the middleware to all app methods, order matters so this should go above all methods you want this to be invoked for, and order within array matters too
app.use([logger, authorize])
// # 4 -->
// can also use app.use(pathname, middlewarename) to specify which routes you want this middleware to be used on
// ex. app.use('/api', loggerMiddleware) --> applies this middleware to all routes using /api

app.get('/', (req, res) => {
    // # 2 -->
    //this section below can be turned into a function and moved into a separate file then imported to act as middleware that can be re-used as needed 

    // const method = req.method
    // const url = req.url
    // const timenow = new Date().getFullYear()

    // console.log(method, "," , url, "," , timenow)

    //end middleware

    //logger(req) is the "middleware"

    res.send("<h1>Welcome to home page</h1>")
})

app.get('/about', (req, res) => {
    res.send("<h1>Welcome to about page</h1>")
})

app.get('/users', (req, res) => {
    res.send("<h1>Welcome to user page</h1>")
})


app.get('*', (req, res) => {
    res.status(404).send("<h1>Page not found</h1>")
})
app.listen(8080, () => console.log("Server is listening on port 8080..."))
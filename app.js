// using express to spin up a server is less verbose

const express = require('express')
const app = express()
const path = require('path')
const { fakeData } = require('./MOCK_DATA')

//serves all required assets automatically within a folder instead of having to read them in one by one like when using the http module. static files are resources the server doesn't have to change
app.use(express.static('./public'))

//since index.html is automatically a root file and its been moved into the public folder, it'll be automatically served as the home page so the function below is not needed
app.get('/', (req, res) => { 
    res.status(200).sendFile('./index.html')
})

app.get('/api/users', (req, res) => {

        const limitedUserInfo = fakeData.map((user) => {
            const {first_name, last_name, email } = user
            return {first_name, last_name, email }
        })
        
        res.json(limitedUserInfo)
})

app.get('/api/users/:userID', (req, res) => {

    //req.params.[paramater name] will always be returned as a STRING
    const specificUser = fakeData.find((user) => {
        return user.id === Number(req.params.userID)
    })

        res.json(specificUser)
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>Resource not found, sorry!</h1>')
    res.end()
})

app.listen(3000, () => {
    console.log("server listening on port 3000")
})

// app.get(path to resource, callback function (req, res) )
// app.put
// app.post
// app.delete

// app.all
// app.use
// app.listen
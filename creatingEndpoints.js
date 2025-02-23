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
            const {id, first_name, last_name, email } = user
            return {id, first_name, last_name, email }
        })
        
        res.json(limitedUserInfo)
})

//sets up parameters, anything that comes after the ":" is not a hardcoded value
app.get('/api/users/:userID', (req, res) => {

    //req.params.[paramater name] will always be returned as a STRING so be sure to handle accordingly
    const specificUser = fakeData.find((user) => {
        return user.id === Number(req.params.userID)
    })

    if (!specificUser) {
        res.status(404).send("<h1>User does not exist</h1>")
    }

        res.json(specificUser)
})

// example url --> http://localhost:3000/api/users/lookup/query?gender=Female
app.get('/api/users/lookup/query', (req, res) => {
    const { gender, limit } = req.query
    console.log(req.query)

    let usersOfThisGender = [...fakeData]
    // console.log(usersOfThisGender)

    if (gender) {
        usersOfThisGender = usersOfThisGender.filter((user) => {
            return user.gender === gender
        })
    }

    if (limit) {
        usersOfThisGender = usersOfThisGender.slice(0, Number(limit))
    } 

    if (usersOfThisGender.length === 0) {
        // res.status(200).send('<h1>No users matched the filters you searched for</h1>')
        return res.status(200).json({success: true, data: []})
    }

    res.json(usersOfThisGender)
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>Resource not found, sorry!</h1>')
    res.end()
})

app.listen(3000, () => {
    console.log("server listening on port 3000...")
})

// app.get(path to resource, callback function (req, res) )
// app.put
// app.post
// app.delete

// app.all
// app.use
// app.listen
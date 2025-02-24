const { people } = require('../data.js')

const getPeople = (req, res) => {
    res.status(200).json( {sucess: true, data: people} )
}

const updatePerson = (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json( {success: false, msg: "Please submit a name"} )  
    }
    res.status(201).json( {success: true, person: name} )
    console.log(req.body.name) //now has access to req.body due to express.json()
}

module.exports = {getPeople, updatePerson}
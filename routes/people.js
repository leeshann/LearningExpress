// ROUTES FOLDER STORES THE SKELETON OF THE ROUTES FOR EACH ENDPOINT
// CONTROLLERS FOLDER STORES THE CODE OF THE ACTUAL CALLBACK ITSELF

const {getPeople, updatePerson} = require('../controllers/people')
const express = require('express')
const router = express.Router()

router.get('/', getPeople)
router.post('/', updatePerson)

module.exports = router
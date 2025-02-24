// ROUTES FOLDER STORES THE SKELETON OF THE ROUTES FOR EACH ENDPOINT
// CONTROLLERS FOLDER STORES THE CODE OF THE ACTUAL CALLBACK ITSELF

const {getProducts, updateProduct, deleteProduct} = require('../controllers/products.js')
const express = require('express')
const router = express.Router()

router.get('/', getProducts)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router
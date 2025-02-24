// ROUTES FOLDER STORES THE SKELETON OF THE ROUTES FOR EACH ENDPOINT
// CONTROLLERS FOLDER STORES THE CODE OF THE ACTUAL CALLBACK ITSELF

const { products } = require('../data.js')

const getProducts = (req, res) => {
    res.status(200).json( {sucess: true, data: products} )
}

const updateProduct = (req, res) => {
    const productID = Number(req.params.id)
    const { price } = req.body
    const match = [...products].find((item) => {
        return item.id === productID
    })

    if (!match) {
        return res.status(200).json({success: true, message: "Product that matches criteria cannot be found"})
    } 

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productID) {
            products[i].price = Number(price)
        }
    }
    res.json({success: true, data: products})
}

const deleteProduct = (req, res) => {
    const productID = Number(req.params.id)

    //good practice to check if this id exists first but I'm lazy 

    const newProducts = [...products].filter((item) => {
        return item.id !== productID
    })

    res.json({success: true, data: newProducts})
}

module.exports = {getProducts, updateProduct, deleteProduct}
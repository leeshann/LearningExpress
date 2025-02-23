//express passes req, res and next automatically for us, we just need to plug the middle where into the method arguments
const logger = (req, res, next) => {
    const method = req.method
    const url = req.url
    const timenow = new Date().getFullYear()

    console.log(method, "," , url, "," , timenow)

    //MIDDLEWARE MUST BE PASSED TO NEXT METHOD OR TERMINATED OR ELSE YOU'LL GET STUCK IN THAT BROWSER STATE WHERE YOU CANT LOAD ANYTHING
    next()
}

module.exports = logger
// makes it so that only if the search param user=shannon is provided, the pages will load, otherwise unauthorized
// will work --> http://localhost:8080?user=shannon
// unathorized --> http://localhost:8080

const authorize = (req, res, next) => {
    const { user } = req.query

    if(user === 'shannon') {
        req.user = { name: 'shannon', id: 25}
        console.log(req.user)
        next()
    } else {
        res.status(401).send("<h1>unauthorized</h1>")
    }
}

module.exports = authorize
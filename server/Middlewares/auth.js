const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization']
    if (token) {
        token = token.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please provide valid token...!" })
            } else {
                next()
            }
        })
    } else {
        res.status(403).send({ result: "Please add token with header" })
    }
}

module.exports = verifyToken
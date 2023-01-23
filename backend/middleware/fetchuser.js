const jwt = require('jsonwebtoken')
const JWT_SECRET = 'jobinjwttoken'

const fetchuser = (req,res,next)=>{
    //get the user from the jwt token and add id to req object
    const token = req.header('auth-token')              //note: before executing, enter a token of a user in the header of thunder client request connection.
    if(!token){
        res.status(401).send({ error: "Please authenticate using token."})
    }
    try {
        data = jwt.verify(token, JWT_SECRET)
        console.log(data)
        // console.log(req.user)
        req.user = data                     //storing data in req.user
        // console.log(req.user)
        next()
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token.", errorDescription: error.message})
    }
}

module.exports = fetchuser

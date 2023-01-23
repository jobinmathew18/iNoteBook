const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'jobinjwttoken'

router.get('/',(req,res)=>{
    console.log(req.body)  
    res.send(req.body)
})

//create a user: register
router.post('/createUser', [                        //inside [ ] we are adding validations 
    body('name').isLength({min: 3}),
    body('email').isEmail(),
    body('password').isLength({min: 3})
], async (req,res)=>{
    const errors = validationResult(req)            //if there are errors while validating then return bad request.
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({error: 'User with this email id already exists'})
        }
        
        //salt is an "extra password" that is added with the user's password
        const salt = await bcrypt.genSalt(10)                   //bcrypt.genSalt(10) returns promise that is why we are using "await" here.  
        // console.log(salt)
        
        //now, combination of user's password + salt is converted into hash password
        const securedPass = await bcrypt.hash(req.body.password, salt)
        // console.log(securedPass)

        user = await User.create({                      //creating a user in database
            name: req.body.name,
            password: securedPass,
            email: req.body.email
        })
        
        const data = {
            id: user.id
        }
        const jwtData = jwt.sign(data, JWT_SECRET)                  //json web token (jwt)
        // console.log(jwtData)

        res.json({user, status: "successful"})
        
    } catch (error) {
        res.status(500).json({message: "some error occured", errorDescription: error.message})                                  
    }
 
})
 

//authenticate a user: login
router.post('/login', [
    body('email', "Enter a valid mail").isEmail(),
    body('password', "Password cannot be blank").exists()
], async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"})
        }
    
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct credentials"})
        }

        console.log(user)
        const data = {
            id: user.id
        }
        const jwtData = jwt.sign(data, JWT_SECRET)                  //json web token (jwt)
        res.json({jwtData, status: "login successful"})

    } catch (error) {
        res.status(500).json({message: "Internal server error", errorDescription: error.message})
    }
})
 
 
//get logged in user details.
//below, fetchuser is a middleware which varifies jwt token of a user.
router.post('/getuser',fetchuser, async(req,res)=>{
    try {   
        const userId = req.user.id;             //here req.user will be equal to "data" (from fetchuser middleware)
        const user = await User.findById(userId).select("-password")
        res.send({user, status: "successful"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error", errorDescription: error.message})
    }
})




module.exports = router      
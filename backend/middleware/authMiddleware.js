const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //Get token from header
            token = req.headers.authorization.split(" ")[1];
            // console.log('Token value:', token)
            // console.log('Token type:', typeof token)
            // console.log('Key: ', process.env.JWT_SECRET)
            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // console.log('Decode payload',decoded)
            
            //Get user from the token
            req.user = await User.findById(decoded.id).select('-password')
            next()
        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error('Not authorized')
        }

    }else{
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {
    protect
}
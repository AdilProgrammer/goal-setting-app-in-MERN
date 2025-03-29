const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//@desc Register new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req , res)=>{
    const {name , email , password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    // Generate token after user is created
    const token = generateToken(user._id)

    // Update user with token
    user.token = token
    await user.save()

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: user.token
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    
    // res.json({
        //     message: "Register User"
        // })
    })
    //@desc Authenticate a user
    //@route POST /api/users/login
    //@access Public
    const loginUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
    
        // Log the received data types
        console.log('Received email type:', typeof email);
        console.log('Received password type:', typeof password);
    
        const user = await User.findOne({ email });
    
        if (user) {
            console.log('Found user, stored password type:', typeof user.password);
            
            const isMatch = await bcrypt.compare(password, user.password);
            console.log('Password match:', isMatch);
    
            if (isMatch) {
                res.json({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id)
                });
            } else {
                res.status(401);
                throw new Error('Invalid credentials');
            }
        } else {
            res.status(401);
            throw new Error('Invalid credentials');
        }
    });
//@desc Get user data
//@route POST /api/me
//@access Private
const getMe = asyncHandler(async (req , res)=>{
    
    res.status(200).json(req.user)
})

const generateToken = (id)=>{
    return jwt.sign({ id } , process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}
const asyncHandler = require("express-async-handler")

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//@desc get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req , res)=>{
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)

})
//@desc set goals
//@route POST /api/goals
//@access Private
const setGoal  = asyncHandler(async (req, res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }else{
        const goal = await Goal.create({
            text: req.body.text,
            user: req.user.id
        })
        res.status(200).json(goal)
    }
})

//@desc update goals
//@route PUT /api/goals:id
//@access Private
const updateGoal = asyncHandler(async (req, res)=>{

    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }


    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
})

//@desc get goals
//@route DELETE /api/goals:id
//@access Private
const deleteGoal = asyncHandler(async (req, res)=>{

    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }


    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    // await goal.remove()
    await Goal.findByIdAndDelete(req.params.id)
    // await Goal.deleteOne({_id:req.params.id})

    res.status(200).json({ id : req.params.id })
    console.log(req.params.id)
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}
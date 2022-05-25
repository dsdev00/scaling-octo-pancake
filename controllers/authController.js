const { randomBytes } = require("crypto")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")


// Auth User Handling
const authUser = asyncHandler(async(req, res) => {
    const email = req.body.email
    // Check User if Exists Will Update || if no User Will Create
    const userExists = await User.findOne({ email })
    if(userExists) {
        userExists.session = randomBytes(8).toString("hex")
        userExists.verify_code = randomBytes(16).toString("hex")
        await userExists.save()
        res.status(200).json({ userExists })
    } else {
         const user = await User.create({ 
            email,
            session: randomBytes(8).toString("hex"),
            verify_code: randomBytes(16).toString("hex"), 
        })
        if(user) {
            res.status(201).json({ user })
        } else {
            res.status(400)
            throw new Error("Failed to Create User")
        }
    }
})

const userVerify = asyncHandler(async(req, res) => {
    try {
        const verify_code = req.params.id
        const user = await User.findOne({ verify_code })
        user.verify_code = null
        user.authenticated = true
        await user.save()
        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    } 
})

const userLogout = asyncHandler(async(req, res) => {
    try {
        const email = req.body.email
        const user = await User.findOne({ email })
        user.session = null
        user.authenticated = false
        await user.save()
        res.status(200).json({ email: user.email, message: "Logout Success" })
    } catch (error) {
      res.status(400).json({ message: error.message })  
    }
})

const userDelete = asyncHandler(async(req, res) => {
    const email = req.body.email
    try {
        const user = await User.findOne({ email })
        user.remove()
        res.status(200).json({ message: "Success Remove User" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = { authUser, userVerify, userLogout, userDelete }
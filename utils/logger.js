const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")


const logger = asyncHandler(async(req, res, next) => { 
    if(req.cookies.gabut) {
        console.log(req.cookies.gabut.maxAge)
    } else {
        res.cookie("gabut", "ada.apa.dengan.cinta", { maxAge: 1000 * 60 })
    }
    next()
})

module.exports = logger
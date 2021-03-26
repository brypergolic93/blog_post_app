// this middleware adds protection to certain tabs that should only be accessible by logged-in users
const User = require('../models/User')

module.exports = (req,res,next) => {
    // fetch the user from the database. If user doesn't exist, redirect to the home page
    User.findById(req.session.userId,(error,user) => {
        if(error || !user) 
            return res.redirect('/')
        next()
    })
}
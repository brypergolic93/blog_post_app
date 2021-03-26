// implement login process and compare the username/password to make sure login is successful

const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req,res) => {
    const{username,password} = req.body; // extract the username and password from the entry form

    User.findOne({username:username},(error,user) => { // try to find one user with the entered username. Is successful, proceed with password auth.
        if (user) {
            // user bcrypt to compare the hashed user password from the database (safe from hackers using the 'timing' attack)
            bcrypt.compare(password, user.password, (error,same) => {
                if(same) {
                    //store user session
                    req.session.userId = user._id
                    res.redirect('/')
                }
                else {
                    res.redirect('/auth/login')
                }
            })
        }
        else {
            res.redirect('/auth/login')
        }
    })
}
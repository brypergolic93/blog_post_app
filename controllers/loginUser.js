// implement login process and compare the username/password to make sure login is successful

const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req,res) => {
    const{username,password} = req.body; // extract the username and password from the entry form
    
    var errorArray = []
    if(username == '') {
        // create an error when username is blank
        errorArray[0] = 'username'
    }
    if(password == '') {
        errorArray[1] = 'password'
    }

    if (errorArray != '') {
        req.flash('errorArray',errorArray) // in flash(), errors get stored so they can later be wiped after the form first submitted
        req.flash('data',req.body)  // when a user enters text, the text is stored here so that the don't need to re-enter if an error is made
        return res.redirect('/auth/login')
    }

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
                    var passwordFlag = 'test'
                    req.session.passwordFlag = passwordFlag
                    return res.redirect('/auth/login')
                }
            })
        }
        else {
            res.redirect('/auth/login')
        }
        
    })
}
const User = require('../models/User.js')
const path = require('path')
const { stream } = require('browser-sync')
//const { ifError } = require('assert')

module.exports = (req,res) => {
    User.create(req.body, (error) => {
        console.log('test')
        if(error) {
            // each error that exists when user storage is attempted gets its message property accessed
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            // store the errors as a string matching 'password' or 'username' (or 'unique')
            var errorArray = []
            for(var i = 0; i < validationErrors.length; i++) {
                errorArray[i] = String(validationErrors[i]);
                if (errorArray[i].includes('password'))
                    errorArray[i] = 'password'
                else if (errorArray[i].includes('username') && errorArray[i].includes('unique'))
                    errorArray[i] = 'username (entered username has been taken)'
                else if (errorArray[i].includes('username'))
                    errorArray[i] = 'username'
                else errorArray[i] = '(unknown)'
            }

            req.flash('errorArray',errorArray) // in flash(), errors get stored so they can later be wiped after the form first submitted
            req.flash('data',req.body)  // when a user enters text, the text is stored here so that the don't need to re-enter if an error is made
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
} 
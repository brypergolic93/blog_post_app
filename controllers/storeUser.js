const User = require('../models/User.js')
const path = require('path')
const { ifError } = require('assert')

module.exports = (req,res) => {
    User.create(req.body, (error,user) => {
        if(error) {
            console.log(ifError)
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}
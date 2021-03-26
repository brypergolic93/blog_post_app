const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    }
});

// Before saving any record, execute the function passed into the 2nd argument
// That way, we can change the data before saving to the database
UserSchema.pre('save',function(next) {
    const user = this // get the user being saved (mongoose makes the UserSchema available using 'this')

    // take the user's password, then specify the number of hashing rounds (10 in this case)
    bcrypt.hash(user.password,10,(error,hash) => {
        user.password = hash
        next()
    })
})

const User = mongoose.model('User',UserSchema);

// expore the variable so that other files can grab it when required
module.exports = User
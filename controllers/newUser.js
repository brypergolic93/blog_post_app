module.exports = (req,res) => {
        
        var username = ""
        var password = ""
        const data = req.flash('data')[0]; // access flash data from storeUser (stored in the first element)

        // data will be undefined if its the first time the user visits the form, so we have no reason to store entered data
        if(typeof data != "undefined") {
                username = data.username
                password = data.password
        }  
        // render register.ejs and retrieve errors from the session (storeUser.js) which is then passed to register.ejs
        res.render('register', {
                errors: req.flash('errorArray'),
                // the username and password are used in register.ejs
                username: username,
                password: password
        })
}
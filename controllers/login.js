module.exports = (req,res) => {

    var username = ""
    var password = ""
    const data = req.flash('data')[0]; // access flash data from storeUser (stored in the first element)
    //console.log(data)
    // data will be undefined if its the first time the user visits the form, so we have no reason to store entered data
    if(typeof data != "undefined") {
        username = data.username
        password = data.password
    }  
    //console.log(errorArray.length),
    res.render('login', {
        errors: req.flash('errorArray'),
        passwordIncorrect: req.session.passwordFlag,
        // the username and password are used in login.ejs
        username: username,
        password: password
    })

}

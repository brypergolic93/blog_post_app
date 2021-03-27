module.exports = (req,res) => {
    // only allow a new post to be created if user is logged in
    if(req.session.userId) {
        userid = req.session.userId
        //userName = user.find({"_id":userid}.username)   // populate each post with the user ID of the session
        //console.log(userName)
        res.render('create')
    } else {
        res.redirect('/auth/login')
    }
 //res.redirect('/auth/login')
}


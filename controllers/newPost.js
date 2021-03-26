module.exports = (req,res) => {
    // only allow a new post to be created if user is logged in
    if(req.session.userId) {
        console.log(req.session)
        res.render('create')
    } else {
        res.redirect('/auth/login')
    }
 //res.redirect('/auth/login')
}


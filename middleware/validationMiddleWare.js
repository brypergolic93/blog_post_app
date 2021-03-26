//Create middleware that makes sure form entry is valid
module.exports = (req,res,next) => {
    if(req.files == null || req.body.title == null || req.body.body == null) {
        //var test = String(req.body.title)
        //console.log(test)
        return res.redirect('/posts/new')
    }
    next()
}


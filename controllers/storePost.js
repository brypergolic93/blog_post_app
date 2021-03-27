const BlogPost = require('../models/BlogPost.js')
const path = require('path')

// post the form data via the request body attribute (need body-parser for this)
module.exports = (req,res) => {
    let image = req.files.image;
    
    // the two dots in the directory go up a folder
    image.mv(path.resolve(__dirname,'..','public/img',image.name), async (error) => {
        // Model creates a new document in the database
        //console.log(req.userId)
        await BlogPost.create({
            ...req.body,
            image:'/img/'+image.name,
            // gets the user id from the current session
            userid: req.session.userId
        })
        
        res.redirect('/')
    })
}
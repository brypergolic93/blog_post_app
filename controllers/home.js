const BlogPost = require('../models/BlogPost.js')
var bodyParser = require('body-parser')

// when a request is made to the home page '/' route index.html is served
// pass the blogposts data back to the client through render
module.exports = async(req,res) => {
    //console.log(filter)
    //const{filter} = req.body
    //console.log(req.body.filter)
    const blogposts = await BlogPost.find({}).populate('userid');   // populate each post with the user ID of the session
    res.render('index', {
        blogposts
    });
}
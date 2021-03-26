const BlogPost = require('../models/BlogPost.js')

// when a request is made to the home page '/' route index.html is served
// pass the blogposts data back to the client through render
module.exports = async(req,res) => {
    const blogposts = await BlogPost.find({})
    console.log(req.session)
    res.render('index', {
        blogposts
    });
}
const BlogPost = require('../models/BlogPost.js')

module.exports = async(req,res) => {
    //console.log(req.params)
    // find the blog post with the requested ID, retrieve it, and pas the blogpost variable to post.ejs
    const blogpost = await BlogPost.findById(req.params.id)
    console.log(blogpost)
    res.render('post',{
        blogpost
    });
}
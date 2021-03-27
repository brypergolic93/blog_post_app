const BlogPost = require('../models/BlogPost.js')

// when a request is made to the home page '/' route index.html is served
// pass the blogposts data back to the client through render
module.exports = async(req,res,next) => {

    // Get filter input from user through index.ejs form Post
    var filterItem = req.body.filter

    const filterBlogposts = await BlogPost.find({title:{$regex:filterItem}}).populate('userid');   // populate each post with the user ID of the session
    res.render('filter', {
        filterBlogposts
    });
}
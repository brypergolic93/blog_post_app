const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    body: String,
    username: String,
    datePosted:{/* declare property type with an object because we need a default*/    
        type: Date,
        default: new Date()
    },
    image: String
});

// mongoose automatically looks for the plural version of your model name 'BlogPost'
const BlogPost = mongoose.model('BlogPost',BlogPostSchema);

// expore the variable so that other files can grab it when required
module.exports = BlogPost
const mongoose = require('mongoose')

const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

// The blogpost is create, while the 2nd argument provides a callback with any errors and the newly created post
//  BlogPost.create({
//     title: "Why Everyone Should Read Dostoevski",
//     body: "The beauty in life is created by the contrast between pain and well-being. One can not recognize eudaemonia without having suffered."
// }, (error, blogpost) => {
//     console.log(error,blogpost)
// });

// Create a query
// BlogPost.find({body:/beauty/}, (error,blogpost) => {
//     console.log(error,blogpost)
// })

// Update records
var id = "6059a966dba67e271ca5d93f";
BlogPost.findByIdAndUpdate(id,{
    title:"The Mythbuster's Guide to Saving Money on Energy Bills"
}, (error,blogspot) => {
    console.log(error,blogspot)
})
 
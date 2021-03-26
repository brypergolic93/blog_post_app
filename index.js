const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload'); // add the 'files' property to the req object so that we can access the uploaded files using req.files
const flash = require('connect-flash'); // store messages associated with a session - allows error messages to be cleared
const ejs = require('ejs'); // ejs allows us to use a template across multiple html files rather than editing all of them whenever a change is needed
const {Z_FILTERED } = require('zlib')

// connect to database
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

const app = new express()
// enable secure hyper text transfer protocol
const http = require('http')
const httpServer = http.createServer(app);
httpServer.listen(4000, () => { console.log('Listening on 4000.') });


// any file ending in .ejs should be rendered with ejs package, which looks in the 'views' folder for the template
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())



const validateMiddleWare = require('./middleware/validationMiddleWare'); //Create middleware that makes sure form entry is valid
app.use('/posts/store',validateMiddleWare) // use validateMiddleWare only when new posts are created (only execute if express sees a request from /posts/url)

app.use(expressSession({
    secret:'keyboard cat' // pass middleware in a config object assigned to 'secret', which signs and encrypts the Session ID session
}))
app.use(flash()); // connect-flash package
// Each time the app is refreshed, this middleware will show that it's been called
const requestMade = (req,res,next) => {
    console.log('App request has been made.')
    next()
}
app.use(requestMade)

// all ejs files will have access to null
global.loggedIn = null;
// on all requests, this middleware "*" should be executed
app.use("*", (req,res,next) => {
    //console.log(req.session.userId)
    loggedIn = req.session.userId;
    next()
});


const homeController = require('./controllers/home')
const aboutController = require('./controllers/about')
const samplePostController = require('./controllers/post')
const contactController = require('./controllers/contact')
const getPostController = require('./controllers/getPost') 
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/rejectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')

app.get('/', homeController)
app.get('/about', aboutController)
app.get('/post', samplePostController)
app.get('/contact', contactController)
app.get('/posts/new', authMiddleware, newPostController) // run the authorization middleware before allowing new post to be made
app.get('/post/:id', getPostController) // :id is a wild card that accepts any string value, eg. line 38 in index.ejs
app.post('/posts/store', authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/auth/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)
app.use((req,res) => res.render('notfound')); // display 404 page if an inexistent url is entered in the search bar
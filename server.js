const express = require('express');
const app = express();
const port = 3000;
const mongo = require('mongodb');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const path = require('path');

//implementing .env file
require('dotenv').config()

//Link to DB
let db = null
const url = 'mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@moa-lfz7p.mongodb.net/test?retryWrites=true&w=majority'

//Connection to DB
mongo.MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    if (err) {
        throw err
    }

    db = client.db(process.env.DB_NAME)
})

//Initializing sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//Set storage engine
const storage = multer.diskStorage({
    destination: './static/uploads',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Initializing upload
const upload = multer({
    storage: storage
}).single('photo')

//App use
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/static', express.static('static'));
app.use(express.static('static'))


//Initializing ejs
app.set('views', 'view')
app.set('view engine', 'ejs')

//Routes
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/register', (req, res) => {
    res.render('register.ejs')
})
app.get('/home', (req, res) => {
    let user = req.session.username
    res.render('home', {user})
})
app.get('/upload', (req, res) => {
    res.render('upload')
})

//Function that sents data from form to DB
app.post('/register', register)
function register(req, res, next) {
    db.collection('register').insertOne({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        age: req.body.age
    }, done)

    function done(err) {
        if (err) {
            next(err)
        } else {
            res.redirect('/login')
        }
    }
}


//Function that validates
app.post('/login', login)
function login(req, res, next) {
    db.collection('register').findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            next(err);
        } else {
            // E-mail does not exist
            if (data == null) {
                res.redirect("/login");
                console.log("No user for this e-mail")
                return;
            }
            // Email and password are matching
            if (req.body.password == data.password) {
                req.session.username = data;
                console.log("Logged in as " + data.username);
                res.redirect("/home");
            } else {
                // Password is wrong
                console.log("Incorrect password");
                res.redirect("/login");
            }
        }
    })
}

//Updates the password
app.post('/update', update)
function update(req, res, next) {
    let user = req.session.username
    console.log(user._id)
    console.log(user.password)

    db.collection('register').updateOne(
        { _id: mongo.ObjectId(user._id)},
        {$set: {password: req.body.password }}
    )
    res.redirect('/login')
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const mongo = require('mongodb');
const bodyParser = require('body-parser');
const session = require('express-session');

//implementing .env file
require('dotenv').config()

//Link to DB
var url = 'mongodb+srv://asd123:asd123@moa-lfz7p.mongodb.net/test?retryWrites=true&w=majority'

//Connection to DB
mongo.MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
    if (err) {
        throw err
    }

    db = client.db(process.env.DB_NAME)
})


//App use
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/static', express.static('static'));
app.use(express.static('static'))
app.use(session({
    name: 'sid',
    cookie: {
        maxAge: 50000,
        sameSite: true,
        secure: true
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}))

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
    res.render('home')
})


//Function that sents data from form to DB
app.post('/register', register)
function register(req, res, next) {
    db.collection('register').insertOne({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }, done)

    function done(err, data) {
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
    db.collection('register').find({}).toArray(done)

    function done(err, user) {
        if (err) {
            next(err)
        } else {
            res.render('home.ejs', { user })
        }
    }
}

//sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
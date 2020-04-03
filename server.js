const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const mongo = require('mongodb');
const bodyParser = require('body-parser');
const session = require('express-session');

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

//Initializing ejs
app.set('views', 'view')
app.set('view engine', 'ejs')


//dirname staat voor het pad waar je op dat moment bent, en stuurt een statische pagina
app.get('/htmllogin', (req, res) => res.sendFile(path.join(__dirname + '/static/index.html')));
app.get('/htmlregister', (req, res) => res.sendFile(path.join(__dirname + '/static/registreren.html')));

//App post
app.post('/register', register)

function register(req, res, next) {
    db.collection('register').insertOne({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        locationAcces: req.body.locationAcces,
        gender: req.body.gender,
        age: req.body.age,
        sexuality: req.body.sexuality,
        movies: req.body.movies,
        music: req.body.music
    }, done)

    function done(err, data) {
        if (err) {
            next(err)
        } else {
            res.redirect('/')
        }
    }
}

//Add user
app.get('/newUser', newUser);

function newUser(req, res) {
    res.render('add.ejs')
}

//Show all username and passwords
app.get('/users', users)
function users(req, res, next) {
    db.collection('register').find({}).toArray(done)

    function done(err, data) {
        if (err) {
            next(err)
        } else {
            console.log(data)
            res.render('user.ejs', { data })
        }
    }
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
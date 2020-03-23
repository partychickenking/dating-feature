const cc = require('camelcase');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const mongo = require('mongodb');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const slug = require('slug');

require('dotenv').config()

let data = [];

var db = null
var url = 'mongodb+srv://asd123:asd123@moa-lfz7p.mongodb.net/test?retryWrites=true&w=majority'



app.use(bodyParser.urlencoded({ extended: false }))

mongo.MongoClient.connect(url, function (err, client) {
    if (err) {
        throw err
    }

    db = client.db(process.env.DB_NAME)
})

app.use('/static', express.static('static'));
app.use(express.static('static'))

//wordt gebruikt voor templating
app.set('views', 'view')
app.set('view engine', 'ejs')

//stuurt text naar een bepaald pad
app.get('/about', (req, res) => res.send('about'));
app.get('/contact', (req, res) => res.send('Dit is de contact'));


//dirname staat voor het pad waar je op dat moment bent, en stuurt een statische pagina
app.get('/dirname', (req, res) => res.sendFile(path.join(__dirname + '/static/registreren.html')));

//dynamische pagina waarbij je gebruikt maakt van objects
app.get('/dynamic', (req, res) => {
    res.render('index', { data: movies })
})

app.get('/movies', movies)

function movies(req, res, next) {
    db.collection('register').find().toArray(done)

    function done(err, data) {
        if (err) {
            next(err)
        } else {

            res.render('list.ejs', { data: data })
        }
    }
}


app.get('/register', (req, res) => res.sendFile(path.join(__dirname + '/static/registreren.html')));

app.post('/', register)

function register(req, res, next) {
    db.collection('register').insertOne({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        giveacces: req.body.giveacces,
        denyacces: req.body.denyacces,
        male: req.body.male,
        female: req.body.female,
        other: req.body.other,
        age: req.body.age,
        straight: req.body.straight,
        gay: req.body.gay,
        bi: req.body.bi,
        othersexuality: req.body.othersexuality,
        action: req.body.action,
        comedy: req.body.comedy,
        horror: req.body.horror,
        fantasy: req.body.fantasy,
        thriller: req.body.thriller,
        romantic: req.body.romantic,
        drama: req.body.drama,
        docu: req.body.docu,
        pop: req.body.pop,
        hiphop: req.body.hiphop,
        rock: req.body.rock,
        dance: req.body.dance,
        rap: req.body.rap,
        jazz: req.body.jazz,
        metal: req.body.metal,
        classic: req.body.classic
    }, done)

    function done(err, data) {
        if (err) {
            next(err)
        } else {
            res.redirect('/')
        }
    }
}

app.listen(port, () => console.log(cc(`Example app listening on port ${port}!`)));
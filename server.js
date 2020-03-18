const cc = require('camelcase');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const mongo = require('mongodb');
const assert = require('assert');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

require('dotenv').config()

var db = null
var url = 'mongodb+srv://asd123:asd123@moa-lfz7p.mongodb.net/test?retryWrites=true&w=majority'


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
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/about', (req, res) => res.send('about'));
app.get('/contact', (req, res) => res.send('Dit is de contact'));


//dirname staat voor het pad waar je op dat moment bent, en stuurt een statische pagina
app.get('/register', (req, res) => res.sendFile(path.join(__dirname + '/static/registreren.html')));

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


app.listen(port, () => console.log(cc(`Example app listening on port ${port}!`)));
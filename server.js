const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const mongo = require('mongodb');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const slug = require('slug');

require('dotenv').config()

//Link to DB
var url = 'mongodb+srv://asd123:asd123@moa-lfz7p.mongodb.net/test?retryWrites=true&w=majority'

//Connection to DB
mongo.MongoClient.connect(url, function (err, client) {
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
app.get('/login', (req, res) => res.sendFile(path.join(__dirname + '/static/index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname + '/static/registreren.html')));

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
//------------------------TEST------------------------
const data = [
    {
      id: 'evil-dead',
      title: 'Evil Dead',
      plot: 'Five friends travel to a cabin in the …',
      description: 'Five friends head to a remote …'
    },
    {
      id: 'the-shawshank-redemption',
      title: 'The Shawshank Redemption',
      plot: 'Two imprisoned men bond over a number …',
      description: 'Andy Dufresne is a young and  …'
    }
]


app.get('/add', form)
app.get('/list', list)

function form(req, res) {
    res.render('add.ejs')
}
function list(req, res) {
    res.render('list.ejs', {data: data})
}

app.post('/', add)

function add(req, res) {
    var id = slug(req.body.title).toLowerCase()
  
    data.push({
      id: id,
      title: req.body.title,
      plot: req.body.plot,
      description: req.body.description
    })
  
    res.redirect('list')
  }



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
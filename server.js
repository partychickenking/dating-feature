const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const mongo = require('mongodb');
const bodyParser = require('body-parser');

require('dotenv').config()


let data = [];

const db = null

//Link to MY database using .env for security
const url = 'mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@moa-lfz7p.mongodb.net/test?retryWrites=true&w=majority'



app.use(bodyParser.urlencoded({ extended: false }))

//Connection to database
mongo.MongoClient.connect(url, function (err, client) {
    if (err) {
        throw err
    }

    db = client.db(process.env.DB_NAME)
})

//Tells express where to look for files
app.use('/static', express.static('static'));
app.use(express.static('static'))


//Tells what templating engine to use and where to find the files
app.set('views', 'view')
app.set('view engine', 'ejs')

//Sends register.html to the user when /register is called
app.get('/register', (req, res) => res.sendFile(path.join(__dirname + '/static/registreren.html')));

//Posts 
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

app.post('/login', login);

function login (req, res){
    db.collection('register')
        .findOne({
            username: req.body.username,
            password: req.body.password
    })
    .then(data=> {
            console.log('Ingelogd!');
            if (data){
                res.redirect('/profile');
        }
    })
    .catch(err=>{
        console.log(err);
        res.redirect('404error');
    });
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
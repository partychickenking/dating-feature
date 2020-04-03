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





const users = [
    {id: 1, name: 'Inju', email: 'inju@inju.nl', password: 'secret'},
    {id: 2, name: 'Anna', email: 'anna@anna.nl', password: 'secret'},
    {id: 3, name: 'Nina', email: 'nina@nina.nl', password: 'secret'}
]


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

app.get('/', (req, res) => {
    const { userId } = req.session
    res.render('index')
})

app.get('/home', (req, res) => {
    res.render('home')
;})

app.get('/login', (req, res) => {
    res.render('login')

})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.get('/logout', (req, res) => {
    res.render('register')
})

//Post requests
app.post('/register', (req, res) => {
    const { username, email, password} = req.body
    
    if (username && email && password ) {
        const exist = users.some(
            user => user.email === email
        )

        if (!exist) {
            const user = {
                id: users.length + 1,
                name,
                email,
                password
            }

            users.push(user)

            req.session.userId = user.id

            return res.redirect('/home', { users })
        }
    }

    res.redirect('/register')

})
app.post('/login', (req, res) => {
    const { email, password } = req.body

    if (email && password) {
        const user = users.find(
            user => user.email === email && user.password === password
        )

        if (user) {
            req.session.userId = user.id
            return res.redirect('/home')
        }
    }
    res.redirect('login')

})
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.redirect('/home')
        }

        res.clearCookie('sid')
        res.redirect('/login')
    })

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
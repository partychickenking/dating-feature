const cc = require('camelcase')
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const movies = {
    title: 'Titanic',
    regisseur: 'James Cameron',
    nominaties: '71'
}

//
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
app.get('/register', (req, res) => res.sendfile(path.join(__dirname + '/static/registreren.html')));

//dynamische pagina waarbij je gebruikt maakt van objects
app.get('/dynamic', (req, res) => {
    res.render('index',{data : movies})
})

console.log(movies)
app.listen(port, () => console.log(cc(`Example app listening on port ${port}!`)));
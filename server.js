const cc = require('camelcase')
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://Inju:Kato1234!@moa-lfz7p.mongodb.net/test?retryWrites=true&w=majority";

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html for more details
     */
    const client = new mongo(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Print the names of all available databases
 * @param {mongo} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

app.get('/get-data', function(req, res, next) {
    var resultArray = [];
    mongo.connect(uri, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('register').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err)
            resultArray.push(doc);
        }, function() {
            db.close();
            res.render('index', {items: resultArray});
        });
    });
});

app.post('/insert', function(req, res, next) {
    var item = {
        username: req.body.username,
        email: req.body.email,
        ww: req.body.ww
    };

    mongo.connect(uri, function(err, db) {
        assert.equal(null, err);
        db.collection('register').insertOne(item, function(err, result) {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });

    });
});




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
    res.render('index', { data: movies })
})

app.listen(port, () => console.log(cc(`Example app listening on port ${port}!`)));
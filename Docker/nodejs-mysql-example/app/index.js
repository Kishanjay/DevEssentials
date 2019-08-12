const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 8000;
const database = require('./database');

database.connect(() => {
    console.log("Database connected!");
});

/**
 * Support _at least_ json and urlencoded request body Content-Types
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/insert', (req, res) => {
    const date = new Date();
    database.insert(date).then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
    });
});

app.get('/get', (req, res) => {
    database.get().then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
    })
});

app.all('/', (req, res) => {
    res.send('Up and running');
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
const express = require('express');
const app = express();
const dbConn = require('./dbconn');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(bodyParser.json());

app.use(function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.post('/api/exercise/new-user', function (req, res) {
    const username = req.body.username;
    dbConn.saveUser(username).then(user => {
        res.json(user);
    }).catch(e => {
        res.json(e);
    })
})

app.post('/api/exercise/add', function (req, res) {
    let postData = req.body;
    if (!postData.hasOwnProperty('date')) {
        postData['date'] = new Date().toDateString();
    }
    dbConn.saveLog(postData)
        .then(output => {
            res.json(output);
        }).catch(e => {
            res.json(e);
        });
})

app.get('/api/exercise/log', function (req, res) {
    const query = req.query;
    dbConn.getLogs(query)
        .then(output => {
            res.json(output);
        }).catch(e => {
            res.json(e);
        })
})

app.get('/api/exercise/users', function(req, res) {
    dbConn.getUsers()
    .then(output => {
        res.json(output);
    }).catch(e => {
        res.json(e);
    })
})

const server = app.listen(process.env.PORT || 3000, function (err) {
    if (err) console.log(err);
    console.log('Server listen in', server.address().port, 'port');
})
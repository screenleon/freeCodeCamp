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

app.post('/api/shorturl/new', function (req, res) {
    dbConn.findAndSaveUrl(req.body.url, function (err, data) {
        if (err) console.error(err);
        // console.log('index line 17:\n', data);
        if (data) res.json(data)
        else res.json({ error: "invalid URL" });

    })
})

app.get('/api/shorturl/:short_url', function (req, res) {
    const short_url = req.params.short_url;
    dbConn.findShortUrl(short_url, function (err, url) {
        if (err) console.error(err);
        res.redirect(url);
    })
})

const server = app.listen(process.env.PORT || 3000, function (err, data) {
    if (err) console.error(err);
    console.log('Server is listen', server.address().port, 'port');

})
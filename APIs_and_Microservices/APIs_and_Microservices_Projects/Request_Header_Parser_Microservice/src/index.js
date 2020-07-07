const express = require("express");
const app = express();

app.use(function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.get('/api/whoami', function (req, res) {
    const output = {};
    output['ipaddress'] = req.ip;
    output['language'] = req.headers['accept-language'];
    output['software'] = req.headers['user-agent'];
    console.log(output);
    res.json(output);
});

const server = app.listen(process.env.PORT || 3000, function (err) {
    if (err) console.error(err);
    console.log('Server is listen', server.address().port);
});
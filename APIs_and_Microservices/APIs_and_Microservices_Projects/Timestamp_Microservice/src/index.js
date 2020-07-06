const express = require('express');
const app = express();
// const router = express.Router();

app.use(function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

app.get('/api/timestamp/', function (req, res) {
    res.json({ 'unix': new Date().getTime(), 'utc': new Date().toUTCString() });
    return;
})

app.get('/api/timestamp/:date_string', function (req, res) {
    const date_string = req.params.date_string;
    let output = {};
    let date;
    const error = "Invalid Date";
    if (/\d+-\d+-\d+/.test(date_string)) {
        date = new Date(date_string);
    } else if (/\d+/.test(date_string)) {
        date = new Date(parseInt(date_string));
    }
    if (typeof (date) === 'object') {
        output['unix'] = date.getTime();
        output['utc'] = date.toUTCString();
    } else {
        output['error'] = error;
    }
    res.json(output);
    return;
})

const server = app.listen(process.env.PORT || 3000, function (err) {
    if (err) console.error(err);
    console.log('Server is listen in', server.address().port)
})

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// --> 7)  Mount the Logger middleware here
app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
/*
app.get('/',function(req, res) {
  res.send('Hello Express');
})
*/


/** 3) Serve an HTML file */
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
})

/** 4) Serve static assets  */
app.use(express.static('public'))

/** 5) serve JSON on a specific route */
app.get('/json', function(req, res) {
  let message = "Hello json";
  if(process.env.MESSAGE_STYLE == 'uppercase'){
    message = message.toUpperCase();
  }
  res.send({message});
})

/** 6) Use the .env file to configure the app */
 
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', function(req, res, next) {
  req.time = Date.now();
  next();
}, function(req, res) {
  const time = new Date(req.time + (20 - Math.round(Math.random() * 40)) * 1000).toString();
  res.send({time})
})

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', function(req, res) {
  const echo = req.params.word
  res.send({echo})
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.route('/name')
  .get(function(req, res) {
  const name = `${req.query.first} ${req.query.last}`;
  res.send({name})
})
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.post('/name', function(req, res){
  const name = `${req.body.first} ${req.body.last}`;
  res.send({name})
})

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;

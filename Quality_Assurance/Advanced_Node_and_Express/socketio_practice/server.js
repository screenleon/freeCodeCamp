'use strict';

require('dotenv').config({ path: './.env' });
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const auth = require('./app/auth.js');
const routes = require('./app/routes.js');
const mongo = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser')
const passportSocketIo = require('passport.socketio');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sessionStore = new session.MemoryStore();
fccTesting(app);

app.use('/public', express.static(process.cwd() + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  key: 'express.sid',
  store: sessionStore,
}));

io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key: 'express.sid',
  secret: process.env.SESSION_SECRET,
  store: sessionStore
}));

mongo.connect(process.env.DATABASE, { useUnifiedTopology: true }, (err, client) => {
  const db = client.db('freeCodeCamp');
  if (err) console.log('Database error: ' + err);

  auth(app, db);
  routes(app, db);

  http.listen(process.env.PORT || 3000);
  let currentUsers = 0;
  io.on('connection', socket => {
    ++currentUsers;
    console.log('user ' + socket.request.user.name + ' connected');
    io.emit('user', { name: socket.request.user.name, currentUsers, connected: true });

    socket.on('chat message', (message) => {
      io.emit('messages', { name: socket.request.user.name, message });
    });

    socket.on('disconnect', () => {
      --currentUsers;
      console.log('A user has disconnected');
      io.emit('user count', currentUsers);
    });
  });



});

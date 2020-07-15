"use strict";

require('dotenv').config({ path: './.env' });
const express = require("express");
const session = require('express-session');
const passport = require('passport');
const mongo = require('mongodb');
const LocalStrategy = require('passport-local');
const fccTesting = require("./freeCodeCamp/fcctesting.js");

const app = express();

fccTesting(app); //For FCC testing purposes
app.set('view engine', 'pug')
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

// set the header set-cookie
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

mongo.connect(process.env.DATABASE, (err, db) => {
  if (err) {
    console.log('Database error: ' + err);
  } else {
    console.log('Successful database connection');

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
      db.collection('users')
        .findOne({ _id: new mongo.ObjectID(id) }, (err, doc) => {
          done(null, doc);
        });
    });
    passport.use(new LocalStrategy(
      function (username, password, done) {
        db.collection('users').findOne({ username: username }, function (err, user) {
          console.log('User ' + username + ' attempted to log in.');
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (password !== user.password) { return done(null, false); }
          return done(null, user);
        });
      }
    ));

    app.route("/").get((req, res) => {
      //Change the response to render the Pug template
      // res.render(__dirname + '/views/pug/index.pug');
      res.render(process.cwd() + '/views/pug/index', { title: 'Hello', message: 'Please login', showLogin: true });
    });

    app.route('/login')
      .post(passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
        res.redirect('/profile');
      });

    app.route('/profile')
      .get((req, res) => {
        res.render(process.cwd() + '/view/pug/profile')
      })

    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on port " + process.env.PORT);
    });
  }
});
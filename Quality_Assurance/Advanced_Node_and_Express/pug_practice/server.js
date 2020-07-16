"use strict";

require('dotenv').config({ path: './.env' });
const express = require("express");
const mongo = require('mongodb');
const bodyParser = require('body-parser');

const fccTesting = require("./freeCodeCamp/fcctesting.js");
const routes = require('./routes');
const auth = require('./auth');
const app = express();

fccTesting(app);
app.set('view engine', 'pug')
app.use("/public", express.static(process.cwd() + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongo.connect(process.env.DATABASE, (err, db) => {
  if (err) {
    console.log('Database error: ' + err);
  } else {
    console.log('Successful database connection');

    auth(app, db);
    routes(app, db);

    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on port " + process.env.PORT);
    });
  }
});
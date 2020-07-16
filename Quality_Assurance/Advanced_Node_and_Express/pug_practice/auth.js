const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongo = require('mongodb');
const session = require('express-session');
const bcrypt = require('bcrypt');

module.exports = function (app, db) {
    // set the header set-cookie
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        if (typeof (user) == 'object') {
            console.log('starting customer session');
            done(null, user._id);
        } else {
            console.log('starting client session');
            done(null, user._id);
        }
    });
    passport.deserializeUser((id, done) => {
        db.collection('users')
            .findOne({ _id: new mongo.ObjectID(id) }, (err, doc) => {
                done(null, doc);
            });
    });
    passport.use(new LocalStrategy(
        (username, password, done) => {
            db.collection('users').findOne({ username }, function (err, user) {
                console.log('User ' + username + ' attempted to log in.');
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!bcrypt.compareSync(password, user.password)) { return done(null, false); }
                return done(null, user);
            });
        }
    ));
}
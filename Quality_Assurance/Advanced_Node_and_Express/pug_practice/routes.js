const bcrypt = require('bcrypt');
const passport = require('passport');

module.exports = function (app, db) {
    app.use(function middleware(req, res, next) {
        console.log('\n', req.method + " " + req.path + " - " + req.ip);
        console.log('body: ', req.body, '\n');
        next();
    })

    app.route("/").get((req, res) => {
        res.render(process.cwd() + '/views/pug/index', { title: 'Hello', message: 'Please login', showLogin: true, showRegistration: true });
    });

    app.route('/login')
        .post(passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
            res.redirect('/profile');
        });

    app.route('/logout')
        .get((req, res) => {
            req.logOut();
            res.redirect('/');
        })

    app.route('/profile')
        .get(ensureAuthenticated, (req, res) => {
            res.render(process.cwd() + '/views/pug/profile', { username: req.user.username })
        })

    app.route('/register')
        .post((req, res, next) => {
            db.collection('users').findOne({ username: req.body.username }, function (err, user) {
                if (err) {
                    next(err);
                } else if (user) {
                    res.redirect('/');
                } else {
                    const hash = bcrypt.hashSync(req.body.password, 12);
                    db.collection('users').insertOne({
                        username: req.body.username,
                        password: hash
                    },
                        (err, doc) => {
                            if (err) {
                                res.redirect('/');
                            } else {
                                next(null, user);
                            }
                        }
                    )
                }
            })
        },
            passport.authenticate('local', { failureRedirect: '/' }),
            (req, res, next) => {
                res.redirect('/profile');
            }
        );

    app.use((req, res, next) => {
        res.status(404)
            .type('text')
            .send('Not Found');
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };
}
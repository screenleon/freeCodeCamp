const db = require('./db');

module.exports = function (app) {
    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-store')
        next()
    });

    app.use((req, res, next) => {
        console.log('\n', req.method, req.path + " - " + req.ip);
        console.log('queries:', req.query);
        console.log('body: ', req.body);
        console.log();
        next();
    });

    app.route('/api/books')
        .get((req, res) => {
            db.getBooks()
                .then(books => {
                    res.json(books);
                }).catch(e => {
                    console.error(e);
                });
        });

    app.route('/api/books')
        .post((req, res) => {
            const bookTitle = req.body.title;
            db.postBook(bookTitle)
                .then(book => {
                    res.json({ _id: book._id, title: book.title, comment: book.comments });
                }).catch(e => {
                    console.error(e);
                });
        });

    app.route('/api/books')
        .delete((req, res) => {
            db.deleteBooks()
                .then(record => {
                    res.json({ result: 'complete delete successful' })
                }).catch(e => {
                    console.error(e);
                })
        });

    app.route('/api/books/:_id')
        .get((req, res) => {
            const bookId = req.params._id;
            db.getBook(bookId)
                .then(book => {
                    res.json(book)
                }).catch(e => {
                    console.error(e);
                })
        });

    app.route('/api/books/:_id')
        .post((req, res) => {
            const bookId = req.params._id;
            const comment = req.body.comment;
            db.postComment(bookId, comment)
                .then(book => {
                    res.json(book);
                }).catch(e => {
                    console.error(e);
                })
        });

    app.route('/api/books/:_id')
        .delete((req, res) => {
            const bookId = req.params._id;
            db.deleteBook(bookId)
                .then(record => {
                    if (record.deletedCount > 0)
                        res.json({ result: 'delete successful' })
                    else
                        res.json({ result: 'no book exists' })
                }).catch(e => {
                    res.json({ result: e })
                })
        });
}
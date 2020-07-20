const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .catch(e => {
        console.error(e)
    })

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    comments: {
        type: [String],
    }
});

const BookModel = mongoose.model('Book', BookSchema);

const getBooks = function () {
    return BookModel.find({})
        .exec()
        .then(books => {
            return books.map(element => {
                element = element.toObject();
                const book = { _id: element._id, title: element.title };
                book['commentcount'] = element.comments.length;
                return book;
            })
        })
}

const getBook = function (_id) {
    return BookModel.findById(_id, '-__v', { lean: true })
        .exec()
}

const postBook = function (title) {
    return BookModel.findOne({ title })
        .exec()
        .then(book => {
            if (!book)
                return BookModel.create({ title });
            return book;
        });
}

const postComment = function (_id, comment) {
    return BookModel.findOneAndUpdate({ _id }, { $push: { comments: [comment] } }, { new: true })
        .exec()
        .then(book => {
            return { _id: book._id, title: book.title, comments: book.comments };
        })
}

const deleteBooks = function () {
    return BookModel.deleteMany({}).exec();
}

const deleteBook = function (_id) {
    return BookModel.deleteOne({ _id })
        .exec();
}

module.exports = { getBooks, postBook, getBook, postComment, deleteBooks, deleteBook };
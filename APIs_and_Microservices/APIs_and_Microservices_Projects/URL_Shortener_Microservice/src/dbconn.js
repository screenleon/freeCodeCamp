const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const DNS = require('dns');
const { URL } = require('url')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.log(e)
    })

const urlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: Number
    }
});

var Url = mongoose.model('Url', urlSchema);

var findAndSaveUrl = function (original_url, done) {
    Url.find({ original_url }, function (err, data) {
        if (err) console.error(err);
        if (data.length === 0) {
            console.log('SaveUrl:', original_url);
            try {
                const url = new URL(original_url);
                if (url.origin === original_url) {
                    DNS.lookup(url.hostname, function (err) {
                        if (!err)
                            Url.count({}, function (err, count) {
                                const urlData = new Url({ original_url, short_url: count + 1 });
                                urlData.save(function (err, data) {
                                    if (err) console.error(err);
                                    done(null, data);
                                })
                            })
                        else done(null);
                    })
                }
            } catch (e) {
                done(null);
            }
        }
        else done(null, data[0]);
    })
}

const findShortUrl = function (short_url, done) {
    console.log('find shortUrl', short_url);
    Url.findOne({ short_url }, function (err, data) {
        if (err) console.error(err);
        if (!data) done(null);
        done(null, data.original_url);
    })
}

exports.Url = Url;
exports.findAndSaveUrl = findAndSaveUrl;
exports.findShortUrl = findShortUrl;
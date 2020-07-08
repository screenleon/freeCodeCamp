const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) console.error(err);
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }
})

const LogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
    }
})

const User = mongoose.model('User', UserSchema);
const Log = mongoose.model('Log', LogSchema);

const saveUser = function (username) {
    return User.findOne({ username })
        .exec()
        .then((user) => {
            if (user)
                return user;
            else {
                return new User({ username }).save();
            }
        }).then(user => {
            user = user.toObject();
            delete user.__v;
            return user;
        })
        .catch(err => {
            throw err;
        });
}

const getUsers = function () {
    return User.find({}, '-__v', { lean: true })
        .exec()
        .then(users => {
            return users;
        }).catch(e => {
            throw e;
        })
}

const saveLog = function (postData) {
    const { userId, description, duration, date } = postData;
    if (!userId || !description || !duration || !date) {
        throw 'not have specific data';
    }
    let output = {};
    return User.findById(userId, '-__v', { lean: true })
        .exec()
        .then((user) => {
            if (!user) throw 'not have user';
            output['username'] = user.username;
            return new Log({ userId, description, duration, date: new Date(date) }).save();
        }).then(log => {
            log = log.toObject();
            delete log.__v;
            delete log.userId;
            log['date'] = new Date(log['date']).toDateString();
            output = Object.assign(output, log);
            return output;
        })
        .catch(e => {
            throw e;
        })
}

const getLogs = function (queryData) {
    let queryConfig = {};
    let output = {};
    const { userId } = queryData;

    if (queryData.hasOwnProperty('limit')) {
        const limit = parseInt(queryData['limit']);
        queryConfig['limit'] = limit;
    }
    const date = {};
    if (queryData.hasOwnProperty('from')) {
        date['$gte'] = new Date(queryData['from']);

    }

    if (queryData.hasOwnProperty('to')) {
        date['$lt'] = new Date(queryData['to']);
    }

    return User.findById(userId, '-__v', { lean: true })
        .exec()
        .then(user => {
            if (!user) throw 'not found user';
            output = Object.assign({}, user);
            return Log.find({ userId, date }, '-_id -__v -userId', queryConfig).exec();
        }).then(logs => {
            output['count'] = logs.length;
            output['log'] = [];
            logs.forEach(element => {
                element = element.toObject();
                element['date'] = new Date(element['date']).toDateString();
                output['log'].push(element);
            })
            return output;
        }).catch(e => {
            throw e;
        })
}

exports.saveUser = saveUser;
exports.saveLog = saveLog;
exports.getLogs = getLogs;
exports.getUsers = getUsers;
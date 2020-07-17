require('dotenv').config({ path: '.env' });
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const router = require('./router');

const app = express();
app.use(helmet.xssFilter());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error(e)
    })

const server = app.listen(process.env.PORT || 3000, (err) => {
    if (err) console.error(err);
    console.log('Server is listen', server.address().port);
})

router(app);
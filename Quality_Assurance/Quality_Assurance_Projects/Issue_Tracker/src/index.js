require('dotenv').config({ path: '.env' });
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');

app.use(helmet.xssFilter());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router(app);

const server = app.listen(process.env.PORT || 3000, (err) => {
    if (err) console.error(err);
    console.log('Server is listen', server.address().port);
})
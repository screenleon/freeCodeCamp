require('dotenv').config({ path: '.env' });
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./router');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));

router(app);

const server = app.listen(process.env.PORT || 3000, (err) => {
    if (err) console.error(err);
    console.log('Server is listen in', server.address().port);
})
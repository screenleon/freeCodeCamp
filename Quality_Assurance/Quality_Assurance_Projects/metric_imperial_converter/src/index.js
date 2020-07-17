require('dotenv').config({ path: '.env' })
const express = require('express');
const helmet = require('helmet');
const routers = require('./routers');

const app = express();

app.use(helmet.noSniff());
app.use(helmet.xssFilter());

const server = app.listen(process.env.PORT || 3000, (err) => {
    if (err) console.error(err);
    console.log('Server is listen', server.address().port);
})

routers(app);

// app.route('/api/convert')
//     .get((req, res) => {
//         console.log(req.query)

//     })

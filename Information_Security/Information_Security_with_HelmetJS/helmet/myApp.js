var express = require('express'); // Do Not Edit
var app = express();              // Do Not Edit
var helmet = require('helmet')

var ninetyDaysInSeconds = 90 * 24 * 60 * 60;

// app.use(helmet.hidePoweredBy());
// app.use(helmet.frameguard({ action: 'DENY' }));
// app.use(helmet.xssFilter());
// app.use(helmet.noSniff());
// app.use(helmet.ieNoOpen());
// app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds }));
// app.use(helmet.dnsPrefetchControl());
// app.use(helmet.noCache());
// app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "trusted-cdn.com"] } }));

app.use(helmet({
  hidePoweredBy: true,
  frameguard: {
    action: 'DENY'
  },
  xssFilter: true,
  noCache: true,
  noSniff: true,
  ieNoOpen: true,
  hsts: {
    maxAge: ninetyDaysInSeconds
  },
  dnsPrefetchControl: true,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"]
    }
  }
}));

module.exports = app;
var api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

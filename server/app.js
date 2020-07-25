const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

const log = require('./util/logger');

const app = express();
nunjucks.configure('client/build', {
  autoescape: true,
  noCache: true,
  express: app,
});

app.disable('x-powered-by');

// Logging incoming request using bunyan (stdout to log)
app.use((req, res, next) => {
  req.log = log.child({
    requestPath: req.url,
    httpVerb: req.method,
    params: req.params,
  });
  req.log.info('Request received');
  next();
});

app.use(bodyParser.json());

// static SPA assets
app.use(
  express.static('client/build', {
    index: false,
  })
);

app.get('*', (req, res) => {
  res.render('index.html');
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('InvalidUri or HttpVerb');
  err.status = 400;
  next(err);
});

app.use((err, req, res, next) => {
  if (req && req.log) {
    req.log.error(err);
  } else {
    log.error(err);
  }

  res.status(err.status || 500);
  res.json({
    msg: err.message,
  });
  next(err);
});

module.exports = app;

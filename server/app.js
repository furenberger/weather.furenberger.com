const express = require('express');
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const axios = require('axios');

const log = require('./util/logger');

const setMapboxConfig = require('../mapbox/setMapboxConfig');
const STATE_ABBREV = require('./data/stateAbbreviation.json');

// const STATE_DATA = 'data/data.json';
const STATE_DATA = 'data/us_states.json';

const app = express();
nunjucks.configure('client/build', {
  autoescape: true,
  noCache: true,
  express: app,
});

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

app.disable('x-powered-by');
app.use(bodyParser.json());

// inject token(s) and env specific configs
app.use(setMapboxConfig(express));

// static SPA assets
app.use(
  express.static('client/build', {
    index: false,
  })
);

app.get(
  '/weather/:zip',
  [check('zip').isNumeric(), check('zip').isLength({ min: 5, max: 5 })],
  async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
    const { zip } = req.params;
    const config = {
      method: 'get',
      url: 'https://api.openweathermap.org/data/2.5/weather',
      params: {
        zip: `${zip},us`,
        appid: process.env.WEATHER_TOKEN,
        units: 'imperial'
      },
      responseType: 'json',
    };

    const response = await axios(config);

    // console.log(JSON.parse(JSON.stringify(response.data)));
    // send back normalized weather and some data-driven details
    const weather = {
      city: response.data.name,
      temperature: `${Math.round(response.data.main.temp)}º`,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      iconName: response.data.weather[0].main,
      description: response.data.weather[0].description,
      details: [
        {
          value: `${response.data.main.temp_max}º`,
          label: 'High Temperature'
        },
        {
          value: `${response.data.main.temp_min}º`,
          label: 'Low Temperature'
        },
        {
          value: `${response.data.main.humidity}%`,
          label: 'Humidity'
        },
        {
          value: `${response.data.wind.speed} mph`,
          label: 'Wind Speed'
        }
      ]
    };

    res.json(weather);
  }
);

app.get('/stateData', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, STATE_DATA));
});

app.get(
  '/stateAbbreviation/:stateName',
  [check('stateName').isAlpha()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const abbrev = STATE_ABBREV[req.params.stateName.toUpperCase()];
    return res.json({
      STATE_ABBREV: abbrev.toUpperCase(),
    });
  }
);

app.get('*', (req, res) => {
  res.render('index.html');
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

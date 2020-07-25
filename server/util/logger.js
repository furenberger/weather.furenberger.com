/**
 * logger.js
 *
 */
const bunyan = require('bunyan');
const path = require('path');

const logLevel = 'info';
let basePath = '';
let logName = '';

try {
  basePath = path.dirname(require.main.filename);
  logName = require(path.join(basePath, 'package.json')).name; // eslint-disable-line import/no-dynamic-require
} catch (e) {
  logName = 'unknown';
}

const log = bunyan.createLogger({
  name: logName,
  streams: [
    {
      level: logLevel,
      stream: process.stdout,
    },
  ],
});

// Adding custom level function so you don't have to specify stream outside module.
log.setLevel = (level) => {
  log.levels(0, level);
  log.info(`Logging level overridden, logging level set to ${level}`);
};
log.info(`Created new logger for ${logName} with logging level ${logLevel}`);

module.exports = log;

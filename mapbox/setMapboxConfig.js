const fs = require('fs');
// const MAPBOX_CONFIG = require('config').get('mapbox');

const setMapboxConfig = (express) => {
  // const { mapboxToken } = MAPBOX_CONFIG;

  fs.writeFileSync(
    `${__dirname}/public/mapboxConfig.js`,
    `var MAPBOX_CONFIG = {
      mapboxToken: '${process.env.MAPBOX_TOKEN}'
    }
    `
  );

  return express.static('mapbox/public');
};

module.exports = setMapboxConfig;

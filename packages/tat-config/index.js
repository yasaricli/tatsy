const fs = require('fs');
const path = require('path');

const _appAbsolutePath = (p) => {
  return path.resolve(p);
};

const _getConfigFile = () => {
  const file = _appAbsolutePath('tat.config.js');

  if (fs.existsSync(file)) {
    return require(file);
  }

  return { };
};

const APP_DIR = _appAbsolutePath('.');
const BUILD_DIR = _appAbsolutePath('.tat');
const ENDPOINT_DIR = _appAbsolutePath('endpoints/*.js');

module.exports = {
  port: 3000,
  host: '127.0.0.1',
  appDir: APP_DIR,
  buildDir: BUILD_DIR,
  endpointsDir: ENDPOINT_DIR,
  ..._getConfigFile()
};
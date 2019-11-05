const fs = require('fs');
const path = require('path');

const _appAbsolutePath = (p) => {
  return path.resolve(p);
};

const _getConfigFile = () => {
  const file = _appAbsolutePath('tatsy.config.js');

  if (fs.existsSync(file)) {
    return require(file);
  }

  return { };
};

module.exports = {
  port: 3000,
  host: '127.0.0.1',

  // show verbose logs
  verbose: false,

  // Tatsy Plugins use tatsy-plugins
  plugins: [],
  
  // api docs
  docs: false,

  // overwrite previous
  ..._getConfigFile(),

  // is in read-only mode.
  appDir: _appAbsolutePath('.'),
  buildDir: _appAbsolutePath('.tatsy'),
  endpointsDir: _appAbsolutePath('endpoints/*.js')
};
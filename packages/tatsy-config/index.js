const fs = require('fs');
const path = require('path');

// ENV VARIABLES
const {
  PORT = 3000,
  BIND_IP = '127.0.0.1',
  ROOT_URL = 'http://localhost:3000',
  NODE_ENV,
  MONGO_URL,
  MONGO_OPLOG_URL
} = process.env;

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

const CONFIGS = {
  
  // Plugins default empty (tatsy-plugins)
  plugins: [],

  // active verbose mode
  verbose: false,

  // active all endpoint list docs
  docs: false,

  // overwrite previous config.
  ..._getConfigFile(),

  // XXX: NOT CHANGED
  // --------- is in read-only mode
  
  // express port
  port: PORT,

  // express listen ip
  bindIp: BIND_IP,

  // Mongodb url and oplog url
  mongoUrl: MONGO_URL,
  oplogUrl: MONGO_OPLOG_URL,

  // Production or development
  isProduction: NODE_ENV === 'production',
  
  // Application directories
  appDir: _appAbsolutePath('.'),
  buildDir: _appAbsolutePath('.tatsy'),
  endpointsDir: _appAbsolutePath('endpoints/*.js'),
  mainJs: _appAbsolutePath('.tatsy/main.js')
};

module.exports = {
  ...CONFIGS,

  // ROOT_URL
  rootUrl: ROOT_URL,
  apiUrl: `${ROOT_URL}/api`
};
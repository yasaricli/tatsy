const { Signale } = require('signale');

const chalk = require('chalk');
const parsePath = require('parse-filepath');
const config = require('tatsy-config');

// log extend.
const log = console.log;

const buildingGlobal = new Signale({
  scope: 'Building'
});


const prodBuildingGlobal = new Signale({
  scope: 'Production Building'
});

const mongoGlobal = new Signale({
  scope: 'Mongodb'
});

const watcherGlobal = new Signale({
  scope: 'Watcher'
});

const _getFileName = (path) => {
  const { name } = parsePath(path);
  return `/api/${name}`;
};

const enter = () => {
  return log('\n');
};

const devStarted = () => {
  return log(`
    - Mode: Development Mode (Watch)
    - Port: ${chalk.red(config.port)}
    - Mongo: ${chalk.green(config.mongoUrl || '-')}
    - Mongo Oplog: ${chalk.green(config.oplogUrl || '-')}
    - Docs: ${chalk.green(config.docs ? config.rootUrl : '-')}
    - Api: ${chalk.green(config.apiUrl)}
  `);
};

const prodStarted = () => {
  return log(`
    - Mode: Production Mode
    - Port: ${chalk.red(config.port)}
    - Mongo: ${chalk.green(config.mongoUrl || '-')}
    - Mongo Oplog: ${chalk.green(config.oplogUrl || '-')}
    - Docs: ${chalk.green(config.docs ? config.rootUrl : '-')}
    - Api: ${chalk.green(config.apiUrl)}
  `);
};

const building = (file) => {
  return buildingGlobal.success(_getFileName(file));
};

const watcherChanged = (path) => {
  return watcherGlobal.success(`${_getFileName(path)} changed successful`);
};

const watcherRemoved = (path) => {
  return watcherGlobal.success(`${_getFileName(path)} remove successful`);
};

const watcherAdded = (path) => {
  return watcherGlobal.success(`${_getFileName(path)} added successful`);
};

const errorTatsyFolder = () => {
  return log(`
    * Could not find a valid build in the ${chalk.red(config.buildDir)} directory!
    * Try building your app with ${chalk.green('tatsy build')} before starting the server.
  `);
};

module.exports = {
  log,
  enter,
  devStarted,
  prodStarted,
  building,
  errorTatsyFolder,
  watcherChanged,
  watcherRemoved,
  watcherAdded,
  mongoGlobal,
  buildingGlobal,
  prodBuildingGlobal
};

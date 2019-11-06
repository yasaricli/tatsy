const { Signale } = require('signale');

const chalk = require('chalk');
const parsePath = require('parse-filepath');
const config = require('tatsy-config');

// log extend.
const log = console.log;

const buildingGlobal = new Signale({
  scope: 'Building'
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

const started = () => {
  return log(`
    - PORT: ${chalk.red(config.port)}
    - API: ${chalk.green(config.apiUrl)}
    - VERBOSE_MODE: ${chalk.yellow(config.verbose)}
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

module.exports = {
  log,
  enter,
  started,
  building,
  watcherChanged,
  watcherRemoved,
  watcherAdded,
  mongoGlobal
};
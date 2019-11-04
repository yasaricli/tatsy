const chalk = require('chalk');
const parsePath = require('parse-filepath');
const config = require('tatsy-config');

// log extend.
const log = console.log;

const _getFileName = (path) => {
  const { name } = parsePath(path);
  return `/api/${name}`;
};

const _watcherText = (text, event) => {
  return log(chalk.white('- Endpoint', text, `has been ${event}`));
};

const enter = () => {
  return log('\n');
};

const started = () => {
  return log(`
    - PORT: ${chalk.red(config.port)}
    - HOST: ${chalk.green(config.host)}
    - VERBOSE_MODE: ${chalk.yellow(config.verbose)}
    - Api running at http://${config.host}:${config.port}/api
  `);
};

const building = (file) => {
  return log(chalk.white('*', chalk.bgBlue(` ${_getFileName(file)} `),  'OK'));
};

const watcherChanged = (path) => {
  return _watcherText(chalk.blue(chalk.bgYellow(` ${_getFileName(path)} `)), 'Changed');
};

const watcherRemoved = (path) => {
  return _watcherText(chalk.bgRed(` ${_getFileName(path)} `), 'Removed');
};

const watcherAdded = (path) => {
  return _watcherText(chalk.bgBlue(` ${_getFileName(path)} `), 'Added');
};

module.exports = {
  log,
  enter,
  started,
  building,
  watcherChanged,
  watcherRemoved,
  watcherAdded
};
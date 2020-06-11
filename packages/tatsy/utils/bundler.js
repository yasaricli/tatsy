// Core Packages
const fs = require('fs');
const path = require('path');

// Depends
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const glob = require('glob');
const nodemon = require('nodemon');
const directoryExists = require('directory-exists');

// Official packages
const config = require('tatsy-config');
const logger = require('tatsy-logger');
const { watcher } = require('tatsy-watcher');
const { utils } = require('tatsy-shortcuts');

const _safeFileName = (name) => {
  return name.replace('.js', '');
};

const _getFile = (f) => {
  return fs.readFileSync(f, 'utf8');
};

const _getTemplate = (name, beforeContent) => {
  const filePath = path.resolve(__dirname, `../templates/${name}.js`);

  if (beforeContent) {
    const mainContent = _getFile(filePath);
    return `${beforeContent}\n${mainContent}`;
  }

  return _getFile(filePath);
};

const _clearBaseDir = (callback) => {

  // remove old dir.
  rimraf.sync(config.buildDir);

  // new base dir
  return mkdirp(config.buildDir, () => {

    // save decode file
    if (config.saveFile) {
      return mkdirp(config.filesDir, callback);
    }

    return callback();
  });
};

// create .tatsy folder
const _mkdirTatsyFolder = (callback) => {
  return _clearBaseDir(() => {
    glob(config.endpointsDir, { }, callback);
  });
};

const _builder = (options) => {
  const {
    isWatcher = false,
    isProduction,
    onSuccess
  } = options;

  if (isProduction) {
    logger.prodBuildingGlobal.await('[%d/5] - Creating an optimized production build', 1);
  }

  return _mkdirTatsyFolder((error, files) => {
    const lines = [];

    // Main Start Add
    lines.push(_getTemplate('start', `
  const isWatcher = ${isWatcher};
`));

    if (isProduction) {
      logger.prodBuildingGlobal.success('[%d/5] - .tatsy folder created', 2);
      logger.prodBuildingGlobal.await('[%d/5] - Creating an main.js', 3);
    }

    files.forEach((f) => {
      const name = path.basename(f);
      const content = _getFile(f);

      // Show Build log
      if (!isWatcher && !isProduction) logger.building(f);

      lines.push(`
(() => {
  ${utils.clearSemi(content)}("${_safeFileName(name)}", Tatsy);
})();
`);
    });

    // Main End Add
    lines.push(_getTemplate('end'));

    // main file
    fs.appendFileSync(config.mainJs, lines.join('\n'), 'utf8');

    if (isProduction) {
      logger.prodBuildingGlobal.success('[%d/5] - successfully created main.js.', 4);
    }

    // success builder
    return onSuccess();
  });
};

// tatsy --start
const start = () => {
  const { isProduction } = config;

  /*
   * Production only server started
   * disable watcher and nodemon!
   */
  if (isProduction) {
    return directoryExists(config.buildDir, (error, result) => {
      if (result) {

        // production started
        logger.prodStarted();

        // RUN API
        return require(config.mainJs);
      }

      return logger.errorTatsyFolder();
    });
  }

  /*
   * Development only server started
   * watcher and active nodemon
   */
  logger.devStarted();

  return _builder({
    isProduction,
    isWatcher: false,
    onSuccess() {
      const server = nodemon({
        script: config.mainJs,
      });

      server.on('quit', () => process.exit());

      return watcher(config.endpointsDir, () => {
        return _builder({
          isWatcher: true,
          onSuccess() {
            return server.restart();
          }
        });
      });
    }
  });
};

// tatsy --build
const build = () => {
  return _builder({
    isProduction: true,
    isWatcher: false,
    onSuccess() {
      logger.prodBuildingGlobal.success('[%d/5] - Compiled successfully.', 5);
    }
  });
};

module.exports = {
  start,
  build
};

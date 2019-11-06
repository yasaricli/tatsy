// Core Packages
const fs = require('fs');
const path = require('path');

// Depends
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const glob = require('glob');

// Official packages
const config = require('tatsy-config');
const logger = require('tatsy-logger');

const _safeFileName = (name) => {
  return name.replace('.js', '');
};

const _getFile = (f) => {
  return fs.readFileSync(f, 'utf8');
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

const _getTemplate = (name) => {
  return path.resolve(__dirname, `../templates/${name}.js`);
};

module.exports = (isStarted, success) => {
  _clearBaseDir(() => {
    const globOptions = {};

    glob(config.endpointsDir, globOptions, (error, files) => {
      const lines = [];

      // Main Start Add
      lines.push(_getFile(_getTemplate('start')));

      // Show started log
      if (isStarted) {
        logger.started(files);
      }

      files.forEach((f) => {
        const name = path.basename(f);
        const content = _getFile(f);
        const buildFile = `${config.filesDir}/${name}`;

        // save decoding file
        if (config.saveFile) {
          fs.appendFileSync(buildFile, content, 'utf8');
        }

        // Show Build log
        if (isStarted) {
          logger.building(f);
        }

        lines.push(`
(() => {
${content}("${_safeFileName(name)}", Tatsy);
})();
        `);
      });

      // Show Build log
      if (isStarted) {
        logger.enter();
      }

      // Main End Add
      lines.push(_getFile(_getTemplate('end')));

      // main file
      fs.appendFileSync(`${config.buildDir}/main.js`, lines.join('\n'), 'utf8');

      // success builder
      return success();
    });
  });
};

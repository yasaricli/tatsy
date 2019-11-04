const chokidar = require('chokidar');
const logger = require('tatsy-logger');

const _onAdd = (path, fn) => {

  // show Added log
  logger.watcherAdded(path);

  // trigger watcher callback
  return fn('Added');
};

const _onChange = (path, fn) => {

  // Show Changed log
  logger.watcherChanged(path);
  
  // trigger watcher callback
  return fn('Changed');
};

const _onLink = (path, fn) => {

  // Show Removed Log
  logger.watcherRemoved(path);

  // trigger watcher callback
  return fn('Removed');
};

const watcher = (files, fn) => {
  const watch = chokidar.watch(files, {
    persistent: true,
    ignoreInitial: true
  });

  // On events
  watch.on('change', (path) => _onChange(path, fn));
  watch.on('add', (path) => _onAdd(path, fn));
  watch.on('unlink', (path) => _onLink(path, fn));

  // watcher returned.
  return watch;
};

module.exports = {
  watcher
};

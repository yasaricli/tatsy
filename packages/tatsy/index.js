const http = require('tatsy-http');
const collection = require('tatsy-collection');
const config = require('tatsy-config');

module.exports = {
  ...http,
  ...collection,
  config
};
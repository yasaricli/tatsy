const express = require('express');

// Official packages
const config = require('tat-config');

// application
const app = express();

module.exports = {
  get(url, callback) {
    return app.get(url, callback);
  },

  post(url, callback) {
    return app.post(url, callback);
  },

  all() {
    return app.get('*', (req, res) => {
      return res.json({
        status: 'error',
        data: {
          message: 'endpoint not found'
        }
      })
    });
  },

  start() {
    return app.listen(config.port, config.host);
  }
};
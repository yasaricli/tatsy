const express = require('express');

// Official packages
const config = require('tatsy-config');

// application
const app = express();

module.exports = {
  get(url, callback) {
    return app.get(url, callback);
  },

  post(url, callback) {
    return app.post(url, callback);
  },

  delete(url, callback) {
    return app.delete(url, callback);
  },

  put(url, callback) {
    return app.put(url, callback);
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
  
  parser() {
    app.use(express.urlencoded({extended: true})); 
    app.use(express.json());
  },

  start() {
    return app.listen(config.port, config.host);
  }
};
const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const listEndpoints = require('express-list-endpoints');

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

  docs() {

    // active template
    this.templateEngine();

    return app.get('/', (req, res) => {
      return res.render('index', {
        endpoints: listEndpoints(app)
      });
    })
  },

  all() {
    return app.get('*', (req, res) => {
      return res.json({
        status: 'error',
        data: {
          message: 'endpoint not found'
        }
      });
    });
  },
  
  parser() {
    app.use(express.urlencoded({extended: true})); 
    app.use(express.json());
  },

  templateEngine() {
    const handler = exphbs({
      layoutsDir: path.resolve(__dirname,'views/layouts'),
      partialsDir: path.resolve(__dirname,'views/partials'),
      defaultLayout: 'main'
    });

    // engine
    app.engine('handlebars', handler);

    // set views http/views
    app.set('views', __dirname + '/views');

    // set engine
    app.set('view engine', 'handlebars');
  },

  start() {
    return app.listen(config.port, config.host);
  }
};
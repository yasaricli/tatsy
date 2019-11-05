const Tatsy = require('tatsy');

// json, urlencoded parser
Tatsy.parser();

// Index Docs api
if (Tatsy.config.docs) {
  Tatsy.docs();
}
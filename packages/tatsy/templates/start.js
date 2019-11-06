const Tatsy = require('tatsy');

// Mongo Connect
Tatsy.Mongo.connect();

// json, urlencoded parser
Tatsy.Http.parser();

// Index Docs api
if (Tatsy.Config.docs) {
  Tatsy.Http.docs();
}
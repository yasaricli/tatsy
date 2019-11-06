const Tatsy = require('tatsy');

// Mongo Connect
Tatsy.Mongo.connect(isWatcher);

// json, urlencoded parser
Tatsy.Http.parser();

// Index Docs api
if (Tatsy.Config.docs) {
  Tatsy.Http.docs();
}
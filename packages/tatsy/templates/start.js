const Tatsy = require('tatsy');

// Mongo Connect
Tatsy.Mongo.connect(isWatcher);

// json, urlencoded parser
Tatsy.Http.parser();

// Index Docs api
if (Tatsy.Config.docs) {
  Tatsy.Http.docs();
}

// AUTH /api/users, /api/login, /api/logout 
(() => {
  
  // Users register and profile 
  Tatsy.Collection('users', Tatsy.Auth)("users", Tatsy);

  // Login Route (POST, GET)
  Tatsy.Route({ endpoints: Tatsy.Auth.login })("login", Tatsy);

  // Logout Route
  Tatsy.Route({ endpoints: Tatsy.Auth.logout })("logout", Tatsy);
})();
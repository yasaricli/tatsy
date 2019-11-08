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
  Tatsy.Collection('users', Tatsy.Auth.UsersCollection)("users", Tatsy);

  // Login Route (POST, GET)
  Tatsy.Route(Tatsy.Auth.LoginRoute)("login", Tatsy);

  // Logout Route
  Tatsy.Route(Tatsy.Auth.LogoutRoute)("logout", Tatsy);
})();
const { error } = require('./returns');

const authenticate = (authRequired, { Collections }) => {
  return async (req, res, next) => {
    if (authRequired) {

      try {
        const token = req.header('x-auth-token');
        const userId = req.header('x-user-id');
  
        // Get User
        const user  = await Collections.users.findOne({
          _id: userId,
          'tokens.token': token
        });
  
        if (user) {
  
          // set user Response
          // XXX: require-atomic-updates (race condition)
          req.user = user;
          req.token = token;
  
          // next handler
          return next();
        }

        // user not found then
        throw new Error();
        
      } catch(err) {

        // set 401 Unauthorized
        res.status(401);

        // return error object.
        return res.json(error('You must be logged in to do this.'));
      }
    }

    return next();
  };
};

module.exports = {
  authenticate
};

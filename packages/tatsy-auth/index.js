const validator = require('validator');
const bcrypt = require('bcryptjs');

const { returns, random } = require('tatsy-shortcuts');
const { STRING_REQUIRED, TOKENS_FIELD } = require('./utils/fields');

module.exports = {
  UsersCollection: {
    schema: {
      email: { unique: true, ...STRING_REQUIRED },
      password:{ minlength: 7, ...STRING_REQUIRED },
      tokens: TOKENS_FIELD,
      profile: { type: Object, default: {} }
    },

    schemaOptions: {
      minimize: false
    },

    endpoints: {
      post: {
        authRequired: false,
        async action(req, res) {
          const { email = '', password = '', profile = {} } = this.bodyParams;

          // default status code
          res.status(400);

          if (!validator.isEmail(email)) {
            return returns.error('Email Address must be valid');
          }

          if (validator.isEmpty(password)) {
            return returns.error('Please enter your password!');
          }

          // Get user
          const user = await this.collections.users.findOne({ email });

          /*
           * User checks and password check
           */
          if (user) {
            return returns.error('User already registered!');
          }

          if (validator.equals(password.toLowerCase(), 'password')) {
            return returns.error('Password is invalid!');
          }

          if (validator.contains(password.toLowerCase(), 'password')) {
            return returns.error('Password should not contain password!');
          }

          // override 400 status code to 201
          res.status(201);

          // User Model
          const doc = new this.model({
            password: bcrypt.hashSync(password, 10),
            profile,
            email
          });

          // Create new user
          const result = await doc.save();

          return returns.success({
            _id: result._id,
            email: result.email
          });
        }
      }
    }
  },

  // POST /api/login
  LoginRoute: {
    endpoints: {
      post: {
        authRequired: false,
        async action(req, res) {
          const { email = '', password = '' } = this.bodyParams;

          // set default status 400
          res.status(400);

          if (!validator.isEmail(email)) {
            return returns.error('Email Address must be valid');
          }

          if (validator.isEmpty(password)) {
            return returns.error('Please enter your password!');
          }

          // Get user
          const user = await this.collections.users.findOne({ email });

          if (!user) {
            return returns.error('User Not Found!');
          }

          // user password checked
          const check = bcrypt.compareSync(password, user.password);

          if (check) {
            const token = random.secret();

            // 200 login
            res.status(200);

            // update user tokens
            await this.collections.users.findOneAndUpdate({ _id: user._id }, {
              tokens: user.tokens.concat({
                token,
                when: new Date()
              })
            }, { new: true });

            return returns.success({
              userId: user._id,
              authToken: token
            });
          }

          //set status 401 Unauthorized
          res.status(401);

          return returns.error('Unauthorized');
        }
      }
    }
  },

  // POST /api/logout
  LogoutRoute: {
    endpoints: {
      post: {
        authRequired: true,
        async action(req) {
          const { user, token } = req;

          // auth token removed filter.
          user.tokens = user.tokens.filter((toc) => {
            return toc.token !== token;
          });

          // logout user saved.
          await user.save();

          return returns.success({
            message: 'User was logout.'
          });
        }
      }
    }
  }
};

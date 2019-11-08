const validator = require('validator');
const Bcrypt = require('bcryptjs');

const { STRING_REQUIRED, TOKENS_FIELD } = require('./utils/fields');

module.exports = {
  Collection: {
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
      async post(body) {
        const { email, password } = body;

        if (validator.isEmail(email)) {
          const user = await this.collections.users.findOne({ email });

          // User found then
          if (user) {

            // Bad Request
            this.res.status(400);

            return {
              status: 'error',
              data: {
                message: 'User already registered!'
              }
            };
          }

          if (validator.isEmpty(password)) {

            // Bad Request
            this.res.status(400);

            return {
              status: 'error',
              data: {
                message: 'Please enter your password!'
              }
            };
          }

          if (validator.equals(password.toLowerCase(), 'password')) {

            // Bad Request
            this.res.status(400);

            return {
              status: 'error',
              data: {
                message: 'Password is invalid!'
              }
            };
          }

          if (validator.contains(password.toLowerCase(), 'password')) {

            // Bad Request
            this.res.status(400);
            
            return {
              status: 'error',
              data: {
                message: 'Password should not contain password!'
              }
            };
          }

          // User Model
          const doc = new this.model({
            email,
            password: Bcrypt.hashSync(body.password, 10)
          });

          // Save User
          const result = await doc.save();

          // set status 201
          this.res.status(201);

          return {
            status: 'success',
            data: {
              _id: result._id,
              email: result.email
            }
          };
        }

        return {
          status: 'error',
          data: {
            message: 'Email Address must be valid'
          }
        };
      },
    
      get(_id) {
        return {
          _id
        };
      }
    }
  },

  login: {
    post({ body }) {
      return {
        body
      };
    }
  },

  logout: {
    post({ body }) {
      return {
        body
      };
    }
  }
};

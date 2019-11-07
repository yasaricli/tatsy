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
        if (validator.isEmail(body.email)) {
          const user = await this.collections.users.findOne({
            email: body.email
          });

          // User found then
          if (user) {
            return {
              status: 'error',
              data: {
                message: 'User already registered!'
              }
            };
          }

          // User Model
          const doc = new this.model({
            email: body.email,
            password: Bcrypt.hashSync(body.password, 10)
          });

          // Save User
          const result = await doc.save();

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

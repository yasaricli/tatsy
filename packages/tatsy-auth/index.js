const validator = require('validator');
const Bcrypt = require('bcryptjs');

const { returns } = require('tatsy-shortcuts');
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
        const { email = '', password = '' } = body;

        // default status code
        this.res.status(400);

        if (!validator.isEmail(email)) {
          return returns.error('Email Address must be valid');
        }

        // Get user
        const user = await this.collections.users.findOne({ email });

        // User found then
        if (user) {
          return returns.error('User already registered!');
        }

        if (validator.isEmpty(password)) {
          return returns.error('Please enter your password!');
        }

        if (validator.equals(password.toLowerCase(), 'password')) {
          return returns.error('Password is invalid!');
        }

        if (validator.contains(password.toLowerCase(), 'password')) {
          return returns.error('Password should not contain password!');
        }

        // override 400 status code to 201
        this.res.status(201);

        // User Model
        const doc = new this.model({
          email,
          password: Bcrypt.hashSync(body.password, 10)
        });

        // Create new user
        const result = await doc.save();

        return returns.success({
          _id: result._id,
          email: result.email
        });
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

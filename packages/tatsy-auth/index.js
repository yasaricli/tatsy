const { STRING_REQUIRED, TOKENS_FIELD } = require('./utils/fields');

module.exports = {
  Collection: {
    schema: {
      email: { unique: true, ...STRING_REQUIRED },
      password:{ minlength: 7, ...STRING_REQUIRED },
      tokens: TOKENS_FIELD
    },

    endpoints: {
      post(body) {
        return { body };
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

module.exports = {
  Collection: {
    schema: {

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

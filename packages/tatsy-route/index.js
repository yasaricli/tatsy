const { middlewares } = require('tatsy-shortcuts');
const { apiUrl } = require('./utils/shortcuts');

module.exports = (route) => {
  const { endpoints = {} } = route;

  return (url, { Http, Mongo }) => {
    const list = Object.keys(endpoints);

    return list.forEach((key) => {
      const fn = Http[key == 'getAll' ? 'get' : key];
      const { authRequired, action } = endpoints[key];

      if (action) {
        const auth = middlewares.authenticate(authRequired, Mongo);

        fn(apiUrl(url, key), auth, async (req, res) => {
          const handler = action.bind({
            collections: Mongo.Collections,
            urlParams: req.params,
            bodyParams: req.body
          });

          return res.json(await handler(req, res));
        });
      }
    });
  };
};

const { middlewares } = require('tatsy-shortcuts');
const { apiUrl } = require('./utils/shortcuts');

module.exports = (route) => {
  const { endpoints = {}, authRequired = false } = route;

  return (url, { Http, Mongo }) => {
    const list = Object.keys(endpoints);

    return list.forEach((key) => {
      const fn = Http[key == 'getAll' ? 'get' : key];
      const auth = middlewares.authenticate(authRequired, Mongo);

      if (fn) {
        fn(apiUrl(url, key), auth, async (req, res) => {
          const handler = endpoints[key].bind({
            collections: Mongo.Collections,
            user: req.user,
            token: req.token,
            res
          });

          return res.json(await handler(req, res));
        });
      }
    });
  };
};
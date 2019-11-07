const { apiUrl } = require('./utils/shortcuts');

module.exports = (route) => {
  const { endpoints = {} } = route;

  return (url, { Http, Mongo }) => {
    const list = Object.keys(endpoints);

    return list.forEach((key) => {
      const fn = Http[key == 'getAll' ? 'get' : key];
    
      if (fn) {
        fn(apiUrl(url, key), (req, res) => {
          const handler = endpoints[key].bind({
            collections: Mongo.Collections
          });

          return res.json(handler(req, res));
        });
      }
    });
  };
};
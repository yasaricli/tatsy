const { apiUrl } = require('./utils/shortcuts');

module.exports = (route) => {
  const { endpoints = {} } = route;

  return (url, { Http }) => {
    const list = Object.keys(endpoints);

    return list.forEach((key) => {
      const handler = Http[key == 'getAll' ? 'get' : key];
    
      if (handler) {
        handler(apiUrl(url, key), (req, res) => {
          const fn = endpoints[key];
          return res.json(fn(req, res));
        });
      }
    });

  };
};
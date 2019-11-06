const { apiUrl } = require('./utils/shortcuts');

module.exports = (route) => {
  const { endpoints = {} } = route;

  return (url, { Http }) => {
    const { getAll, get, post, put, del } = endpoints;

    // get /api/
    if (getAll) {
      Http.get(apiUrl(url), (req, res) => {
        return res.json(getAll(req, res));
      });
    }

    // get /api/:_id
    if (get) {
      Http.get(apiUrl(url, '_id'), (req, res) => {
        const { _id } = req.params;
        return res.json(get(_id));
      });
    }

    // post /api
    if (post) {
      Http.post(apiUrl(url), (req, res) => {
        const { body } = req;

        return res.json(post(body));
      });
    }

    // put /api/:_id
    if (put) {
      Http.put(apiUrl(url, '_id'), (req, res) => {
        const { _id } = req.params;
        const { body } = req;

        return res.json(put(_id, body));
      });
    }

    // delete /api/:_id
    if (del) {
      Http.delete(apiUrl(url, '_id'), (req, res) => {
        const { _id } = req.params;

        return res.json(del(_id));
      });
    }
  };
};
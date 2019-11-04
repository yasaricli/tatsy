const mongoose = require('mongoose');
const db = require('./utils/db');
const { returnJSON, returnSuccess, returnFail } = require('./utils/shortcuts');

// connect mongo
db.connect(mongoose);

module.exports = {
  collection(col) {
    return (http, url) => {
      const model = mongoose.model(col.name, col.schema);

      // getAll
      http.get(`/api/${url}`, (req, res) => {
        model.find({ }, (err, list) => {
          res.json(returnJSON('success', list))
        })
      });

      http.get(`/api/${url}/:_id`, (req, res) => {
        const { _id } = req.params;
        return model.findOne({ _id }, (err, doc) => {
          if (doc) {
            return res.json(returnSuccess(doc));
          }

          return res.json(returnFail(col.name));
        })
      });

      http.post(`/api/${url}`, (req, res) => {
        return res.json(returnJSON('success', {}));
      });

      http.put(`/api/${url}/:_id`, (req, res) => {
        return res.json(returnJSON('success', {}));
      });

      http.delete(`/api/${url}/:_id`, (req, res) => {
        return res.json(returnJSON('success', {}));
      });
    }
  }
}
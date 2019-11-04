const mongoose = require('mongoose');
const db = require('./utils/db');
const { returnJSON, returnSuccess, returnFail } = require('./utils/shortcuts');

// connect mongo
db.connect(mongoose);

module.exports = {
  collection(col) {
    return (http, url) => {
      const Model = mongoose.model(col.name, col.schema);

      // getAll
      http.get(`/api/${url}`, (req, res) => {
        Model.find({ }, (err, list) => {
          res.json(returnJSON('success', list))
        })
      });

      http.get(`/api/${url}/:_id`, (req, res) => {
        const { _id } = req.params;

        return Model.findOne({ _id }, (err, doc) => {
          if (doc) {
            return res.json(returnSuccess(doc));
          }

          return res.json(returnFail(col.name));
        })
      });

      http.post(`/api/${url}`, (req, res) => {
        const { body } = req;

        // create model
        const doc = new Model(body);

        // save doc
        return doc.save((err, data) => {
          return res.json(returnSuccess(data));
        });
      });

      http.put(`/api/${url}/:_id`, (req, res) => {
        const { _id } = req.params;
        const { body } = req;

        // update
        Model.findOneAndUpdate({ _id }, body, (err, data) => {
          if (data) {
            return res.json(returnSuccess(data));
          }

          return res.json(returnFail(_id));
        })
      });

      http.delete(`/api/${url}/:_id`, (req, res) => {
        const { _id } = req.params;

        // remove
        return Model.findOneAndDelete({ _id }, (err, data) => {
          if (data) {
            return res.json(returnSuccess(data));
          }

          return res.json(returnFail(_id));
        })
      });
    }
  }
}
// Mongo
const mongoose = require('mongoose');

const db = require('./db');
const { returnJSON, returnSuccess, returnFail } = require('./returns');
const { apiUrl } = require('./shortcuts');

// connect mongo
db.connect(mongoose);

module.exports = (col) => {
  const {
    name, 
    schema, 
    isCollection = true,
    endpoints = {}
  } = col;

  if (isCollection) {
    return (http, url) => {
      const Model = mongoose.model(name, schema);
  
      // getAll
      http.get(apiUrl(url), (req, res) => {
        Model.find({ }, (err, list) => {
          res.json(returnJSON('success', list))
        })
      });
  
      http.get(apiUrl(url, '_id'), (req, res) => {
        const { _id } = req.params;
  
        return Model.findOne({ _id }, (err, doc) => {
          if (doc) {
            return res.json(returnSuccess(doc));
          }
  
          return res.json(returnFail(name));
        })
      });
  
      http.post(apiUrl(url), (req, res) => {
        const { body } = req;
  
        // create model
        const doc = new Model(body);
  
        // save doc
        return doc.save((err, data) => {
          return res.json(returnSuccess(data));
        });
      });
  
      http.put(apiUrl(url, '_id'), (req, res) => {
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
  
      http.delete(apiUrl(url, '_id'), (req, res) => {
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

  return (http, url) => {
    const { getAll, get, post, put, del } = endpoints;

    if (getAll) {
      http.get(apiUrl(url), (req, res) => {
        return res.json(getAll(req, res));
      })
    }

    if (get) {
      http.get(apiUrl(url, '_id'), (req, res) => {
        const { _id } = req.params;
        return res.json(get(_id));
      })
    }

    if (post) {
      http.get(apiUrl(url, '_id'), (req, res) => {
        const { _id } = req.params;
        const { body } = req;

        return res.json(post(_id, body));
      })
    }

    if (put) {
      http.get(apiUrl(url, '_id'), (req, res) => {
        const { _id } = req.params;
        const { body } = req;

        return res.json(put(_id, body));
      })
    }

    if (del) {
      http.get(apiUrl(url, '_id'), (req, res) => {
        const { _id } = req.params;

        return res.json(del(_id));
      })
    }
  }
}
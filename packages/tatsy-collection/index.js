const { returnJSON, returnSuccess, returnFail } = require('./utils/returns');
const { apiUrl } = require('./utils/shortcuts');

module.exports = (name, options) => {
  const {
    schema = {}, 
    schemaOptions = {},
    transform = (doc, obj) => obj
  } = options;

  return (url, { Http, Mongo }) => {
    const Model = Mongo.model(name, new Mongo.Schema(schema, {
      timestamps: true,
      versionKey: false,
      toJSON: { transform },
      ...schemaOptions
    }));

    // getAll
    Http.get(apiUrl(url), (req, res) => {
      Model.find({ }, (err, list) => {
        res.json(returnJSON('success', list));
      });
    });

    Http.get(apiUrl(url, '_id'), (req, res) => {
      const { _id } = req.params;

      return Model.findOne({ _id }, (err, doc) => {
        if (doc) {
          return res.json(returnSuccess(doc));
        }

        return res.json(returnFail(name));
      });
    });

    Http.post(apiUrl(url), (req, res) => {
      const { body } = req;

      // create model
      const doc = new Model(body);

      // save doc
      return doc.save((err, data) => {
        return res.json(returnSuccess(data));
      });
    });

    Http.put(apiUrl(url, '_id'), (req, res) => {
      const { _id } = req.params;
      const { body } = req;

      // update
      Model.findOneAndUpdate({ _id }, body, (err, data) => {
        if (data) {
          return res.json(returnSuccess(data));
        }

        return res.json(returnFail(_id));
      });
    });

    Http.delete(apiUrl(url, '_id'), (req, res) => {
      const { _id } = req.params;

      // remove
      return Model.findOneAndDelete({ _id }, (err, data) => {
        if (data) {
          return res.json(returnSuccess(data));
        }

        return res.json(returnFail(_id));
      });
    });
  };
};

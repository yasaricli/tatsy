const { middlewares } = require('tatsy-shortcuts');

const { returnJSON, returnSuccess, returnFail } = require('./utils/returns');
const { apiUrl } = require('./utils/shortcuts');

module.exports = (name, options) => {
  const { schema = {}, schemaOptions = {}, transform = (doc, obj) => obj, endpoints = {} } = options;

  return (url, { Http, Mongo }) => {
    const Model = Mongo.collection(name, schema, transform, schemaOptions);

    const handlers = {
      getAll: {
        authRequired: false,
        async action() {
          const list = await Model.find({ });

          // return all list.
          return returnJSON('success', list);
        }
      },

      get: {
        authRequired: false,
        async action(req, res) {
          const { _id } = this.urlParams;

          if (Mongo.isValidId(_id)) {
            const doc = await Model.findById(_id);

            if (doc) {
              return returnSuccess(doc);
            }

            // set status
            res.status(404);

            // error
            return returnFail(name);
          }

          res.status(500);
          return returnFail('_id not valid');
        }
      },

      post: {
        authRequired: false,
        async action() {
          const doc = new Model(this.bodyParams);

          // save data
          const data = await doc.save();

          // return success
          return returnSuccess(data);
        }
      },

      put: {
        authRequired: false,
        async action(req, res) {
          const { _id } = this.urlParams;

          if (Mongo.isValidId(_id)) {
            const data = await Model.findOneAndUpdate({ _id }, this.bodyParams);

            if (data) {
              return returnSuccess(data);
            }

            // set status 404
            res.status(404);
            return returnFail(_id);
          }

          res.status(500);
          return returnFail('_id not valid');
        }
      },

      delete: {
        authRequired: false,
        async action(req, res) {
          const { _id } = this.urlParams;

          if (Mongo.isValidId(_id)) {
            const data = await Model.findOneAndDelete({ _id });

            if (data) {
              return returnSuccess(data);
            }

            res.status(404);
            return returnFail(_id);
          }

          res.status(500);
          return returnFail('_id not valid');
        }
      }
    };

    Object.keys(endpoints).forEach((key) => {
      const endpoint = endpoints[key];
      const handler = handlers[key];

      handlers[key] = {
        ...handler,
        ...endpoint,
      };
    });

    Object.keys(handlers).forEach((key) => {
      const method = Http[key == 'getAll' ? 'get' : key];
      const endpoint = handlers[key];
      const middleware = middlewares.authenticate(endpoint.authRequired, Mongo);

      method(apiUrl(url, key), middleware, async (req, res) => {
        const fn = endpoint.action.bind({
          collections: Mongo.Collections,
          model: Model,
          urlParams: req.params,
          bodyParams: req.body
        });

        return res.json(await fn(req, res));
      });
    });
  };
};

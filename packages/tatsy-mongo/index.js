const mongoose = require('mongoose');
const config = require('tatsy-config');
const { mongoGlobal } = require('tatsy-logger');

module.exports = {
  ...mongoose,

  // connect mongodb
  connect(isWatcher) {
    const { connection } = mongoose;
    
    // Run MongoDB server if MONGO_URL exists.
    if (config.mongoUrl) {
      if (!isWatcher) {
        mongoGlobal.await('[%d/2] - Connecting to mongo', 1);
      }

      mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      connection.on('open', function() {
        if (!isWatcher) {
          mongoGlobal.success('[%d/2] - Connected to mongo server', 2);
        }
      });

      connection.on('error', function() {
        mongoGlobal.error('[%d/2] - Could not connect to mongo server!', 2);
      });
    }
  }
};

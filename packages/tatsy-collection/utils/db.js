const { mongoGlobal } = require('tatsy-logger');

module.exports = {
  connect(mongoose) {
    const { connection } = mongoose;

    mongoGlobal.await('[%d/2] - Connecting to mongo', 1);

    mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    connection.on('open', function() {
      mongoGlobal.success('[%d/2] - Connected to mongo server', 2);
    });

    connection.on('error', function() {
      mongoGlobal.error('[%d/2] - Could not connect to mongo server!', 2);
    });

    return mongoose;
  }
};

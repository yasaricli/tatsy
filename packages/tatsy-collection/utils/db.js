module.exports = {
  connect(mongoose) {
    return mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
};
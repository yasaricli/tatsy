const path = require('path');

module.exports = {
  entry: './client/src/app.js',
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // Rules to load scss
      {
      // Some change here
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'static')
  }
};

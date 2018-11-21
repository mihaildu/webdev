const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
}

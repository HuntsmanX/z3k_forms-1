'use strict';

var path              = require('path');
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var formattedConfig = {},
    config = require('./config.json').development;

Object.keys(config).forEach(function(key) {
  formattedConfig[key] = JSON.stringify(config[key]);
});

module.exports = {

  devtool: 'eval-source-map',

  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'scripts/index.js'),
    path.join(__dirname, 'styles/index.scss')
  ],

  output: {
    path:       path.join(__dirname, '/build/'),
    filename:   '[name].js',
    publicPath: '/'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(formattedConfig),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject:   'body',
      filename: 'index.html'
    })
  ],

  module: {
    loaders: [
      {
        test:    /\.js$/,
        exclude: /node_modules/,
        loader:  "babel",
        query: {
          presets: [
            "es2015",
            "react",
            "stage-0",
            "react-hmre"
          ],
          plugins: [
            "transform-decorators-legacy",
            "transform-class-properties"
          ]
        }
      }, {
        test:    /\.scss$/,
        exclude: /node_modules/,
        loader:  ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
      }
    ]
  },

  sassLoader: {
    includePaths: [
      path.join(__dirname, '/node_modules/')
    ]
  }

};

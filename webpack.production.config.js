'use strict';

var path              = require('path');
var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin       = require('stats-webpack-plugin');

var formattedConfig = {},
    config = require('./config.json').production;

Object.keys(config).forEach(function(key) {
  formattedConfig[key] = JSON.stringify(config[key]);
});

module.exports = {

  entry: [
    path.join(__dirname, 'scripts/index.js'),
    path.join(__dirname, 'styles/index.scss')
  ],

  output: {
    path:       path.join(__dirname, '/build/'),
    filename:   '[name]-[hash].min.js',
    publicPath: '/'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject:   'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings:  false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source:  false,
      modules: false
    }),
    new webpack.DefinePlugin(formattedConfig)
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
            "stage-0"
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
      }, {
        test:    /\.woff$/,
        loader:  'file?name=fonts/[name].[ext]'
      }
    ]
  },

  sassLoader: {
    includePaths: [
      path.join(__dirname, '/node_modules/')
    ]
  }

};

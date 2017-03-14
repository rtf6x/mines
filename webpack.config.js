const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: 'build',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader'
        },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      },
      {
        test: /\.(css)$/,
        use: [{
          loader: 'style-loader'
        },
          {
            loader: 'resolve-url-loader'
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(jpg|png|ico|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240 // Any png-image or woff-font below or equal to 10K will be converted to inline base64 instead
          }
        }]
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['build'] }
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.(scss|css)$/,
      debug: true,
      options: {
        output: {
          path: 'build'
        },
        postcss: [
          autoprefixer({ browsers: 'last 2 version' })
        ],
        context: ''
      }
    })
  ]
};
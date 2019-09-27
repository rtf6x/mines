const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: __dirname + '/build',
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          'resolve-url-loader',
          'css-loader',
          'postcss-loader'
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
        context: ''
      }
    })
  ]
};

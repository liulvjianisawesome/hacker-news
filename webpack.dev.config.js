const path = require('path');
const webpack = require('webpack');
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
  entry: {
    app: ['./src/index.js', hotMiddlewareScript],
  },
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: { _: path.resolve(__dirname, 'src') },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['env', 'react'],
            plugins: ['transform-object-rest-spread'],
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: '[name]-[local]'
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(css|less)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      },
    ]
  }
};
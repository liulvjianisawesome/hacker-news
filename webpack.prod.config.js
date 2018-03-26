const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '/build'),
    filename: '[name].js',
  },
  externals: { react: 'React', 'react-dom': 'ReactDOM' },
  plugins: [
    // Uglify的配置
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['env', 'react']
          }
        }
      },
    ]
  }
};
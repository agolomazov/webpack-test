var path = require('path');
var webpack = require('webpack');

var PRODUCTION = process.env.NODE_ENV == 'production';
var DEVELOPMENT = process.env.NODE_ENV == 'development';

var entry = PRODUCTION ? ['./src/index.js'] :
  [
    './src/index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080'
  ];

var plugins = PRODUCTION ? [
    new webpack.optimize.UglifyJsPlugin({
      comments: true,
      mangle: false,
      compress: {
        warnings: true
      }
    })
  ] : [new webpack.HotModuleReplacementPlugin()];

plugins.push(
  new webpack.DefinePlugin({
    DEVELOPMENT: JSON.stringify(DEVELOPMENT),
    PRODUCTION: JSON.stringify(PRODUCTION)
  })
);

module.exports = {
  devtool: 'source-map',
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader?limit=100000&name=images/[hash:12].[ext]'
          }
        ]
      }
    ]
  },
  plugins: plugins
}

const path = require('path');
const webpack = require('webpack');
const nib = require('nib');
const jeet = require('jeet');
const rupture = require('rupture');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  entry: [
    './src/index.jsx',
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'dist'),
    publicPath: '/dist/',
  },

  devtool: 'none',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.json/,
        loader: 'file-loader',
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'stylus-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MinifyPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [nib(), jeet(), rupture()],
        },
        context: '/',
      },
    }),
  ],
};

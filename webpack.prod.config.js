const path = require('path');
const webpack = require('webpack');
const nib = require('nib');
const jeet = require('jeet');
const rupture = require('rupture');

module.exports = {

  entry: [
    './src/index.jsx',
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
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
        test: /\.(png|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=[name].[ext]',
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
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [nib(), jeet(), rupture()],
        },
        context: '/',
      },
    }),
  ],

  devServer: {
    host: 'localhost',
    port: 3002,
    historyApiFallback: true,
    hot: true,
  },
};

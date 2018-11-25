const path = require('path');
const webpack = require('webpack');
const nib = require('nib');
const jeet = require('jeet');
const rupture = require('rupture');

module.exports = {

  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?http://0.0.0.0:4000/',
    'webpack/hot/only-dev-server',
    './src/index.jsx',
  ],

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
  },

  devtool: 'inline-source-map',

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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [nib(), jeet(), rupture()],
        },
      },
    }),
  ],

  devServer: {
    host: 'localhost',
    port: 4000,
    historyApiFallback: true,
    hot: true,
  },
};

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = env => {
  const isProd = env.NODE_ENV === 'production';
  // Fix
  const entry = isProd ? './src/demo/demo.jsx': './src/demo/demo.jsx';
  
  const config = {
    mode: env.NODE_ENV,
    entry: entry,
    devtool: 'source-map',
    output: {
      path: path.join(__dirname, 'lib'),
      filename: 'bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/demo/index.html'),
      }),
      new ExtractTextPlugin('styles.css'),
    ],
    resolve: {
      extensions: ['.jsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            }
          }, {
            loader: 'sass-loader'
          }]
        },
        {
          test: /\.css$/,
          use: [{
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            }
          }]
        }
      ],
    }
  };

  // config.plugins.push(new BundleAnalyzerPlugin());

  return config;
};

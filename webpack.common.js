const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: `.env.${process.env.NODE_ENV || 'dev'}`,
      systemvars: true
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ]
};

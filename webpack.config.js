const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const TerserPlugin = require('terser-webpack-plugin');
const { ProvidePlugin } = require('webpack');
require('dotenv');

const publicDir = 'public';
const srcDir = 'src';
const outDir = 'build';

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: path.join(__dirname, srcDir, 'index'),
  target: 'web',
  output: {
    publicPath: '/',
    path: path.join(__dirname, outDir),
    filename: 'public/[name].[contenthash].js',
    clean: true,
  },
  mode: isProd ? 'production' : 'development',
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, publicDir, 'index.html'),
    }),
    new ProvidePlugin({
      React: 'react',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'swc-loader',
          },
        ],
      },
      {
        test: /\.module\.s?[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /(?<!\.module)\.s?[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: 'global',
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, srcDir),
      '@globals': path.resolve(__dirname, srcDir, 'shared/ui/_globals'),
    },
  },
  devServer: {
    host: 'localhost',
    hot: true,
    compress: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
};

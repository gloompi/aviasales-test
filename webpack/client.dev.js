const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const baseConfig = require('./client.base')

const config = {
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index.js')
  ],
  plugins: [
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'],
      filename: '[name].js',
      minChunks: Infinity
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}

module.exports = merge(baseConfig, config)
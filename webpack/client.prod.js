const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const baseConfig = require('./client.base')

const config = {
  entry: [path.resolve(__dirname, '../src/index.js')],
  plugins: [
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].[chunkhash].js',
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        screw_ie8: true,
        comments: false
      },
      sourceMap: true
    }),
    new webpack.HashedModuleIdsPlugin() // not needed for strategy to work (just good practice)
  ]
}

module.exports = merge(baseConfig, config)
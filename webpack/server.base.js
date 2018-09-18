const path = require('path')
const webpack = require('webpack')

const res = p => path.resolve(__dirname, p)

const entry = res('../server/render.js')
const output = res('../build/server/')

module.exports = {
  // Tell webpack to run babel on every file it runs through
  entry: [entry],
  output: {
    path: output,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: path.resolve(__dirname, '../build/static/')
  },
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'stylus-loader'
          }
        ]
      },
      {
				test: /\.(gif|png|ico|jpg|jpeg)$/,
				exclude: /node_modules/,
				use: 'file-loader?limit=10000&name=assets/img/[name]-[hash].[ext]'
			},
			{
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?limit=10000&name=assets/fonts/[name]-[hash].[ext]"
      },
      {
				test: /\.(ttf|otf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader?limit=10000&name=assets/fonts/[name]-[hash].[ext]'
      },
			{
				test: /\.(webm|mp4)$/,
				loader: 'file-loader?limit=10000&name=assets/video/[name]-[hash].[ext]'
			},
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '.styl'],
    alias: {
			'Root': path.resolve(__dirname, '../'),
      'App': path.resolve(__dirname, '../api'),
      'Src': path.resolve(__dirname, '../src'),
      'Server': path.resolve(__dirname, '../server'),
			'Pages': path.resolve(__dirname, '../src/pages'),
			'Ducks': path.resolve(__dirname, '../src/ducks'),
			'Assets': path.resolve(__dirname, '../src/assets'),
			'Reducers': path.resolve(__dirname, '../src/reducers'),
			'Components': path.resolve(__dirname, '../src/components'),
		}
  },
}
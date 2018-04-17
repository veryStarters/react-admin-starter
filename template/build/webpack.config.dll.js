var webpack = require('webpack')
var path = require('path')
var rasConfig = require('../src/rasConfig')

module.exports = {
  entry: {
    dll: rasConfig.dll || []
  },
  output: {
    path: path.join(__dirname, './dll/'),
    filename: '[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: './build/dll/manifest.json',
      name: '[name]'
    })
  ]
}

var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    dll: [
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'react-redux',
      'redux-thunk',
      'react-code-splitting'
    ]
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

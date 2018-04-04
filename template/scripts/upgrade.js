process.env.NODE_ENV = 'development'
process.env.BABEL_ENV = 'development'

require('babel-register')
require('./upgrade.babel')
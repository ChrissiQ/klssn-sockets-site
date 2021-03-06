
/*!
 * Module dependencies.
 */

var path      = require('path')
var rootPath  = path.resolve(__dirname + '../')

/**
 * Expose config
 */

module.exports = {
  development: {
    root: rootPath,
    db: 'mongodb://localhost/expresstest'
  },
  test: {
    root: rootPath,
    db: 'mongodb://localhost/expresstest'
  },
  staging: {
    root: rootPath,
    db: process.env.MONGOHQ_URL
  },
  production: {
    root: rootPath,
    db: process.env.MONGOHQ_URL
  }
}

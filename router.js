
var index   = require('index')
var user    = require('user')
var post    = require('post')

module.exports = function (app) {
  app.get('/', index.index)
  app.get('/users', user.index)
  app.get('/users/list', user.list)
  app.get('/posts', post.index)
  app.get('/post/new', post.new)
}
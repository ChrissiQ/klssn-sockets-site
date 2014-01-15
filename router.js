module.exports = function (app, io) {

  var index   = require('index')

  console.log("Index:", index)
  var user    = require('user')
  var post    = require('post')
  var block   = require('block')

  io.sockets.on('connection', function(){
    console.log("Detecting new connection.")
  })

  app.get('/', index.index)
  app.get('/users', user.index)
  app.get('/users/list', user.list)
  app.get('/posts', post.index)
  app.get('/post/new', post.new)

  app.get('/block/new', block.create)

  app.put('/blocks', block.updateAll)

  app.get('/blocks', block.index)
  app.get('/block/:id', block.read)
  app.post('/block', block.create)

}

var mongoose= require('mongoose')
  , Block   = mongoose.model('Block')

var index   = require('index')
var user    = require('user')
var post    = require('post')
var block   = require('block')

module.exports = function (app, io) {

  io.sockets.on('connection', function(socket){
    socket.on('newBlock', function(data){
      var block = new Block(data)
      io.sockets.emit('newBlock', block)
    })
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
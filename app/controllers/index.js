
/*
 * GET home page.
 */


  exports.index = function(req, res){

  //  io.sockets.on('connection', function (socket) {
  //
  //    socket.on('newBlock', function (data) {
  //      io.sockets.emit('newBlock', data)
  //    })
  //    //socket.emit('news', { hello: 'world' })
  //    //socket.on('my other event', function (data) {
  //    //  console.log(data)
  //    //})
    //res.socket.on('connection', function() { console.log("Connected socket.")})
    //res.socket.on('newBlock', function(data){res.socket.emit('newBlock',data)})
    //res.socket.emit('connection')

    //console.log("SOCKET:", res.io)
      res.render('index', { title: 'Chrissi Klassen' })
  //  })
  }

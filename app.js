
/**
 * Module dependencies.
 */

var express   = require('express')
var http      = require('http')
var path      = require('path')
var fs        = require('fs')
var connect   = require('connect')
var mongoose  = require('mongoose')
var lessMiddleware = require('less-middleware')

// env and config
var env       = process.env.NODE_ENV || 'development'
var config    = require('./config')[env]

// Connect to mongodb
var connection = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } }
  mongoose.connect(config.db, options)
}
connection()

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err)
})

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  connection()
})

// Bootstrap models
var models = fs.readdirSync( path.join(__dirname, '/app/models') )
models.forEach(function (file) {
  if ( ~file.indexOf('.js') ){
    var filepath = path.join(__dirname, '/app/models/', file)
    require( filepath )
  }
})

// Bootstrap passport config
//require('./config/passport')(passport, config)

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(express.cookieParser())
app.use(express.cookieSession({secret:'abc124'}))
app.use(express.csrf())
app.use(function(req, res, next){
    res.locals.token = req.csrfToken()
    next()
})
app.use(app.router)
app.use(lessMiddleware({
  dest: path.join(__dirname, 'public/css'),
  src:  path.join(__dirname, 'src/less'),
  prefix: '/css',
  compress: true
}))
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler())
}


var server = http.createServer(app)
var io = require('socket.io').listen(server)
// router
require('./router')(app, io)

// Expose app
module.exports = app

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
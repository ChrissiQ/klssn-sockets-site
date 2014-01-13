
var mongoose  = require('mongoose')
  , Post      = mongoose.model('Post')


/*
 * GET posts listing.
 */


exports.index = function(req, res){
  Post.count({}, function(err, count){
    console.log("There are " + count + " posts.")
    res.send("There are " + count + " posts.")
  })
}

exports.new = function(req, res){
  var post = new Post({'title':'How to node'})
  post.save()
  res.send('')
  console.log(post)
}


var mongoose = require('mongoose')

/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.index = function(req, res){
  res.send("")
  User = mongoose.model('User')
  console.log(User)
}

console.log("Loading blocks.")

/*
 * Module dependencies
 */

var mongoose    = require('mongoose')
var Schema      = mongoose.Schema

/**
 * Block schema
 */

var BlockSchema = new Schema({
  x: {type : Number},
  y: {type : Number},
  h: {type : Number},
  createdAt: {type : Date, default : Date.now}
})

BlockSchema.methods = {

  //save: function()

}

mongoose.model('Block', BlockSchema)
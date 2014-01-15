
var mongoose  = require('mongoose')
  , Block      = mongoose.model('Block')
  , ObjectId  = mongoose.Types.ObjectId


/*
 * GET posts listing.
 */


exports.index = function(req, res){
  Block.count({}, function(err, count){
    console.log("There are " + count + " blocks.")
    //res.send("There are " + count + " blocks.")
  })
  Block.find({}, function(err, blocks){
    res.send(JSON.stringify(blocks))
  })
}

exports.create = function(req, res){
  var block = new Block({'x' : 0, 'y' : 0, 'h' : 0})
  block.save()
  res.send('')
  console.log(block)
}

exports.read = function(req, res){
  console.log("Params:",req.params)
  var id = 0;
  var block = Block.find({id: ObjectId(id)})
  res.send(JSON.stringify(block))
}

exports.updateAll = function(req, res){
  //var blocks = []
  if (req.body){
    Block.create(req.body, function(){
      //console.log("Blocks:", blocks);
      Block.find({}, function(err, blocks){
        //console.log("Blocks:",JSON.stringify(blocks))
        res.send(JSON.stringify(blocks))
      })

    })
    //req.body.forEach(function(val){
    //  console.log("Value:",val)
    //  var block = new Block(val)
    //  block.save()
    //  blocks.push(block)
    //})
  }

}
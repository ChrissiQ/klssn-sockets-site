
console.log("Loading posts.")

/*
 * Module dependencies
 */

var mongoose    = require('mongoose')
var Schema      = mongoose.Schema

/**
 * Getters
 */

var getTags = function (tags) {
  return tags.join(',')
}

/**
 * Setters
 */

var setTags = function (tags) {
  return tags.split(',')
}

/**
 * Post schema
 */

var PostSchema = new Schema({
  title:  {type : String, default : '', trim : true},
  body:   {type : String, default : '', trim : true},
  user:   {type : Schema.ObjectId, ref : 'User'},
  comments: [{
    body: {type : String, default : ''},
    user: {type : Schema.ObjectId, ref : 'User'},
    createdAt: { type : Date, default : Date.now}
  }],
  tags: {type : [], get : getTags, set : setTags},
  createdAt: {type : Date, default : Date.now}
})

PostSchema.methods = {

  addComment: function (user, comment, cb) {

    this.comments.push({
      body: comment.body,
      user: user.id
    })

    this.save(cb)
  },

  removeComment: function(commentID, cb) {

    var indexof = function (arr, obj) {
      var index = -1; // not found initially
      var keys = Object.keys(obj);
      // filter the collection with the given criterias
      var result = arr.filter(function (doc, idx) {
        // keep a counter of matched key/value pairs
        var matched = 0;

        // loop over criteria
        for (var i = keys.length - 1; i >= 0; i--) {
          if (doc[keys[i]] === obj[keys[i]]) {
            matched++;

            // check if all the criterias are matched
            if (matched === keys.length) {
              index = idx;
              return idx;
            }
          }
        };
      });
      return index;
    }

    var index = indexof(this.comments, {id: commentID})
    if (~index) this.comments.splice(index, 1)
    else return cb('not found')
    this.save(cb)
  }

  //save: function()

}

mongoose.model('Post', PostSchema)
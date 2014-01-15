define(['jquery', 'underscore', 'backbone', 'views/canvas'],

    function($, _, Backbone, canvas){

        var BlockModel = Backbone.Model.extend({

            urlRoot: "/block",

            initialize: function () {
                console.log("Init block model.")
                //this.fetch({
                    //complete: function(res,status){
                this.hsla = 'hsla(' + this.get('h') + ',100%,50%,0.5)'
                this.render()
                this.on('change', function(){
                    this.reset()
                })
                    //}
                //})
            },

            draw: function(colour) {

                var size = canvas.blockSize
                  , x = this.get('x') * size
                  , y = this.get('y') * size

                canvas.ctx.fillStyle = colour
                canvas.ctx.fillRect( x + 0.5, y + 0.5, size - 0.5, size - 0.5)

            },

            reset: function() {
                this.draw('white')
                this.draw(this.hsla)
            },

            render: function () {
                this.draw(this.hsla)
            }

        });

        return BlockModel
    }

);
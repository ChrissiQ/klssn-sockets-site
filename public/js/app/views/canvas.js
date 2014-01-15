define(['jquery', 'underscore', 'backbone'],

    function($, _, Backbone){

        var CanvasView = Backbone.View.extend({

            initialize: function(){
                this.setElement('canvas#background')
                this.ctx        = this.el.getContext('2d')
                this.blockSize  = 20
                this.reset()
            },

            resize: function (event) {
                this.render()
            },

            reset: function () {
                this.el.width  = $('body').innerWidth()
                this.el.height = $('body').innerHeight()
                this.origin = {
                    x: this.el.width/2,
                    y: 0
                }
                this.ctx.translate(this.origin.x, this.origin.y)
            },

            render: function () {
                this.reset()
                this.trigger('render')
            }
        })

        return new CanvasView()
    }

)
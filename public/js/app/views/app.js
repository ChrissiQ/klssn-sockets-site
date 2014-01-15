define(['jquery', 'underscore', 'backbone', 'views/canvas', 'collections/blocks', 'socket'],

    function($, _, Backbone, canvas, Blocks, socket){

        var AppView = Backbone.View.extend({

            initialize: function(){
                console.log("Init.")
                this.setElement('body')
                Blocks.fetch({complete: function(res){console.log("Fetched blocks.")}})
                this.on('drawBlock', function (event) {
                    this.drawBlock(event)
                })
            },

            lastHue: 0,

            events: {
                'mousedown' : 'mousedown',
                'mouseup'   : 'mouseup',
                'mousemove' : 'mousemove',
                'drawBlock' : 'drawBlock'
            },

            csrf: $('#_csrf').val(),

            isMouseDown: false,
            lastMouseMove: null,

            resize: function(event){
                canvas.resize(event)
            },

            mousedown: function(event){
                console.log("Mousedown")
                this.isMouseDown = true
                this.draw()
            },

            drawBlock: function (block) {
                console.log("Drawing block triggered by socket")
                Blocks.add(block)
            },

            draw: function(){

                if (this.isMouseDown){
                    this.lastHue++

                    var x = Math.floor( (event.pageX - (canvas.el.width/2)) / canvas.blockSize )
                      , y = Math.floor( event.pageY / canvas.blockSize )

                    var thisBlock = Blocks.where({ 'x' : x, 'y' : y })
                    if (thisBlock.length < 1){
                        Blocks.add({'x': x, 'y': y, 'r': 0, 'h': this.lastHue})
                        socket.emit('newBlock', Blocks.last())
                    } else {
                        thisBlock[0].set('h', thisBlock[0].get('h') + 1 )
                    }

                    this.lastMouseMove = {x:x,y:y}

                }

            },

            mouseup: function(event){
                var app = this

                app.isMouseDown = false
                app.lastMouseMove = null

                Blocks.sync('update', Blocks, {
                    headers: {"X-CSRF-Token": app.csrf },
                    complete: function(res, req){
                        console.log("Completed update:", res, req)
                    },
                    error: function(res, req){
                        console.log("Error updating:", res, req)
                    }
                })
            },

            mousemove: function(event){

                this.draw()
            }
        })

        return new AppView()
    }

)
define(['jquery', 'underscore', 'backbone', 'views/canvas'],

    function($, _, Backbone, canvas){

        var AppView = Backbone.View.extend({

            initialize: function(){
                console.log("Init.");
                this.setElement('body');
            },

            events: {
                'mousedown' : 'mousedown',
                'mouseup'   : 'mouseup',
                'mousemove' : 'mousemove'
            },

            isMouseDown: false,
            lastMouseMove: null,

            resize: function(event){
                canvas.resize(event);
            },

            mousedown: function(event){
                console.log("Mousedown");
                this.isMouseDown = true;
            },

            mouseup: function(event){
                console.log("Mouseup");
                this.isMouseDown = false;
                this.lastMouseMove = null;
            },

            mousemove: function(event){
                if (this.isMouseDown){

                    var pageX = event.pageX - 0.5;
                    var pageY = event.pageY - 0.5;

                    if (this.lastMouseMove){

                        canvas.ctx.lineTo(pageX,pageY);
                        canvas.ctx.lineWidth = 2;
                        canvas.ctx.stroke();
                        //canvas.ctx.fillRect(event.pageX, event.pageY,1,1);

                    } else {
                        canvas.ctx.moveTo(pageX,pageY);
                        canvas.ctx.fillRect(pageX,pageY,1,1);
                    }
                    this.lastMouseMove = {x:pageX,y:pageY};
                }
            }
        });

        return new AppView();
    }

);
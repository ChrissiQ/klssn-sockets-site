define(['jquery', 'underscore', 'backbone'],

    function($, _, Backbone){

        var CanvasView = Backbone.View.extend({

            initialize: function(){
                this.setElement('canvas#background');
                //console.log(this.el);
                this.el.width  = $('body').innerWidth();
                this.el.height = $('body').innerHeight();
                this.ctx = this.el.getContext('2d');
                this.ctx.fillStyle = "rgb(200,0,0)";
                this.ctx.lineWidth = 20;

                //var canvas = $('#background')[0];
                //canvas.width = $(window).innerWidth();
                //canvas.height = $(window).innerHeight();
                //var ctx = canvas.getContext('2d');

                //ctx.fillStyle = "rgb(200,0,0)";
            },

            resize: function(event){
                console.log(event);

                this.render();
            },

            render: function(){
                this.imageData = this.ctx.getImageData(0,0,this.el.width,this.el.height);

                var width = this.el.width;
                var height = this.el.height;

                this.el.width  = $('body').innerWidth();
                this.el.height = $('body').innerHeight();
                this.ctx.putImageData(this.imageData,0,0);
                
                this.ctx.translate( ($('body').innerWidth() - this.el.width)/2, 0);
                console.log("Render canvas.");
            }
        });

        return new CanvasView();
    }

);
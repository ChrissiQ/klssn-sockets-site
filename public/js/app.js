require.config({
    baseUrl:    '/js',
    urlArgs:    "bust=" +  (new Date()).getTime(),
    paths: {
        'jquery'    : 'jquery-2.0.3.min',
        'backbone'  : 'backbone-min',
        'underscore': 'underscore-min',
        'app'       : 'app',
        'views'     : 'app/views',
        'models'    : 'app/models',
        'collections':'app/collections'
    },
    shim: {
        underscore: { exports: '_' },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    }
})

require(['jquery', 'underscore', 'backbone', 'domReady', 'socket',

    'views/app',

    'plugins'],

    function($, _, Backbone, domReady, socket,

        appView

    ){

        domReady(function(){

            socket.on('news', function (data) {
                console.log(data)
                socket.emit('my other event', { my: 'data' })
            })

            socket.on('newBlock', function (block) {
                console.log("New block received", block)
                appView.trigger('drawBlock', block)
            })

            var resizeTimer = null

            $(window).on('resize', function(event){
                clearTimeout(resizeTimer)
                resizeTimer = setTimeout(function(){
                    appView.resize(event)
                }, 10)
            })

        })

        return this

    }
)
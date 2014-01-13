require.config({
    baseUrl:    '/js',
    urlArgs:    "bust=" +  (new Date()).getTime(),
    paths: {
        'jquery'    : 'jquery-2.0.3.min',
        'backbone'  : 'backbone-min',
        'underscore': 'underscore-min',
        'app'       : 'app',
        'views'     : 'app/views',
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
});

require(['jquery', 'underscore', 'backbone', 'domReady',

    'views/app',

    'plugins'],

    function($, _, Backbone, domReady,

        appView

    ){

        domReady(function(){

            var resizeTimer = null;

            $(window).on('resize', function(event){
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function(){
                    appView.resize(event);
                }, 10);
            });

        });

        return this;

    }
);
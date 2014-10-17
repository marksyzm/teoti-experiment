require([
    "config"
], function() {
    "use strict";

    require(["app"], function(app){
        app.init();
    });
});

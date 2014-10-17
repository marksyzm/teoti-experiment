/**
 * User: marksyzm
 * Date: 18/07/2014
 * Time: 12:20
 */
define([
    "angular"
], function (angular) {
    "use strict";

    var app = {
            /**
             * Load in the angular modules and initialise the application
             */
            init: function () {
                angular.element(document.documentElement).ready(function() {
                    angular.resumeBootstrap([ "teoti" ]);
                });
            }
        };

    return app;
});

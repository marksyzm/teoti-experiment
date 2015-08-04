"use strict";

var angular = require("angular");

angular.module("teoti.directives").directive("threads", [
    function () {
        return {
            templateUrl: 'views/directives/threads.html',
            restrict: "A",
            scope: {
                threads: "="
            }
        };
    }
]);
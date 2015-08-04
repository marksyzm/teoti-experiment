"use strict";

var angular = require("angular");

angular.module("teoti.directives").directive("thread", [
    function () {
        return {
            templateUrl: 'views/directives/thread.html',
            restrict: "A",
            scope: {
                thread: "="
            }
        };
    }
]);
"use strict";

var angular = require("angular");

angular.module("teoti.directives").directive("thread", [
    function () {
        return {
            templateUrl: function (el, attrs) {
                if (attrs.view) { return 'views/directives/thread/'+attrs.view+'.html'; }
                return 'views/directives/thread/simple.html';
            },
            restrict: "A",
            scope: {
                thread: "="
            }
        };
    }
]);
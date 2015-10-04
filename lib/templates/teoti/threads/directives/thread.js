"use strict";

var angular = require("angular");

angular.module("teoti.threads").directive("thread", [
    function () {
        return {
            templateUrl: function (el, attrs) {
                if (attrs.view) return require('../views/thread/'+attrs.view+'.html');
                return require('../views/thread/simple.html');
            },
            restrict: "A",
            scope: {
                thread: "="
            }
        };
    }
]);
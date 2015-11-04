"use strict";

var angular = require("angular");
var shoutTemplate = require("../views/shout.html");


angular.module("teoti.shouts").directive("shout", [
    function () {
        return {
            templateUrl: shoutTemplate,
            restrict: "A",
            scope: {
                shout: "=",
                shoutTemp: "="
            }
        };
    }
]);
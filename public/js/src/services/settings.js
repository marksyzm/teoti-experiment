"use strict";

var angular = require("angular");

angular.module("teoti.services").factory("Settings", [
    function () {
        return {
            paths: {
                partials: "/views/partials"
            }
        };
    }
]);
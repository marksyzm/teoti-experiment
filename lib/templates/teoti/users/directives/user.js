"use strict";

var angular = require("angular");

angular.module("teoti.users").directive("user", [
    function () {
        return {
            templateUrl: function (el, attrs) {
                if (attrs.view) return require('../views/user/'+attrs.view+'.html');
                return require('../views/user/compact.html');
            },
            restrict: "A",
            scope: {
                user: "="
            }
        };
    }
]);
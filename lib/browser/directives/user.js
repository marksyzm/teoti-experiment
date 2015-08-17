"use strict";

var angular = require("angular");

angular.module("teoti.directives").directive("user", [
    function () {
        return {
            templateUrl: function (el, attrs) {
                if (attrs.view) { return 'views/directives/user/'+attrs.view+'.html'; }
                return 'views/directives/user/compact.html';
            },
            restrict: "A",
            scope: {
                user: "="
            }
        };
    }
]);
"use strict";

var angular = require("angular");

angular.module("teoti.directives").directive("paginate", [
    function () {
        function linker (scope) {
            scope.next = function ($event) {
                $event.preventDefault();
                scope.page++;
            };

            scope.prev = function ($event) {
                $event.preventDefault();
                scope.page--;
            };
        }

        return {
            templateUrl: "views/directives/paginate.html",
            restrict: "AE",
            link: linker,
            scope: {
                page: "=",
                showNext: "=",
                showPrev: "="
            }
        };
    }
]);
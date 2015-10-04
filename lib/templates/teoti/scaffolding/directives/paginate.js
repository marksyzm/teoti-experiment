"use strict";

var angular = require("angular");

angular.module("teoti.scaffolding").directive("paginate", [
    function () {
        function linker (scope) {
            scope.next = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                scope.page++;
            };

            scope.prev = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                scope.page--;
            };
        }

        return {
            templateUrl: require('../views/paginate.html'),
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
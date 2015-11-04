"use strict";

var angular = require("angular");
var paginateTemplateUrl = require('../views/paginate.html');

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
            templateUrl: paginateTemplateUrl,
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
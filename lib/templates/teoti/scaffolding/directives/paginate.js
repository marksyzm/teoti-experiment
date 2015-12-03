"use strict";

var angular = require("angular");
var _ = require("lodash");
var paginateTemplateUrl = require('../views/paginate.html');

angular.module("teoti.scaffolding").directive("tPaginate", [
    function () {
        function linker (scope) {
            scope.isNumeric = _.isNumber(scope.numbers);
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
                page: "=tPaginatePage",
                showNext: "=tPaginateShowNext",
                showPrev: "=tPaginateShowPrev",
                numbers: "=tPaginateNumbers"
            }
        };
    }
]);
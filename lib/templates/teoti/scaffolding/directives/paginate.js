"use strict";

var angular = require("angular");
var paginateTemplateUrl = require('../views/paginate.html');

angular.module("teoti.scaffolding").directive("tPaginate", [
    function () {
        function linker (scope) {
            scope.changePage = function ($event, page, active) {
                $event.preventDefault();
                $event.stopPropagation();
                if (!active || scope.loading) return;
                scope.page = page < 1 ? 1 : page;
            };

            scope.pageRange = function (count, page, size) {
                size = size || 7;
                var start = page - Math.floor(size/2);
                if (start < 1) {
                    start += -start + 1;
                }
                var end = start + size -1;
                if (end > count) {
                    var diff = end - count;
                    start = start - diff;
                    end = end - diff;
                }
                var numbers = [];
                for (var i = start; i <= end; i++) {
                    numbers.push(i);
                }
                return numbers;
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
                nextUrl: "=?tPaginateNextUrl",
                prevUrl: "=?tPaginatePrevUrl",
                count: "=?tPaginateCount",
                loading: "=?tPaginateLoading",
                buttonCount: "=?tPaginateButtonCount",
                defaultPageNumber: "=?tPaginateDefaultPageNumber"
            }
        };
    }
]);
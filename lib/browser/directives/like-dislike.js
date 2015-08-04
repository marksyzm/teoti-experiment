"use strict";

var angular = require("angular");

angular.module("teoti.directives").directive("likeDislike", [
    "Settings",
    function () {
        function linker (scope) {
            scope.onClickUp = function ($ev) {
                var $el = angular.element($ev.currentTarget);
                console.log($el.attr("class"));
            };

            scope.onClickDown = function ($ev) {
                var $el = angular.element($ev.currentTarget);
                console.log($el.attr("class"));
            };
        }

        return {
            link: linker,
            restrict: "A",
            templateUrl: "views/directives/like-dislike.html",
            scope: {
                post: "=",
                settings: "="
            }
        };
    }
]);
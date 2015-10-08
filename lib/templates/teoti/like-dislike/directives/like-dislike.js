"use strict";

var angular = require("angular");
var likeDislikeTemplateUrl = require("../views/like-dislike.html");

angular.module("teoti.like-dislike").directive("likeDislike", [
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
            templateUrl: likeDislikeTemplateUrl,
            scope: {
                post: "=",
                settings: "="
            }
        };
    }
]);
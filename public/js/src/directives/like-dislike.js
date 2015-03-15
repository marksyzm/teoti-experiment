"use strict";

var angular = require("angular");

angular.module("teoti.directives").directive("likeDislike", [
    "Settings",
    function (Settings) {
        function linker (scope, element) {
            element.on("click", "a", function (ev) {
                var $el = angular.element(ev.currentTarget);
                console.log($el.attr("class"));
            });
        }

        return {
            link: linker,
            restrict: "A",
            templateUrl: Settings.paths.partials + "/like-dislike.html",
            scope: {
                post: "=",
                settings: "="
            }
        };
    }
]);
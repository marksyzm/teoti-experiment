"use strict";

var angular = require("angular");

angular.module("teoti.directives").directive("a", [
    "$location",
    function ($location) {
        function linker (scope, element) {
            element.click(function (ev) {
                var $el = angular.element(ev.currentTarget),
                    rel = $el.attr("rel");

                if (rel === "next") { return window.location = $el.data("href"); }
                if (rel === "external" || $el.attr("target") === "_self") { return; }
                var href = $el.attr("href");
                if (href) { $location.path(href); }
                ev.preventDefault();
            });
        }
        return {
            restrict: "E",
            link: linker
        };
    }
]);
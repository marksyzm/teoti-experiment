"use strict";

var angular = require("angular");
var _ = require("lodash");

angular.module("teoti.scaffolding").directive("html", [
    "Events", "$document", "$window",
    function (Events, $document, $window) {
        function linker (scope, element) {
            element.bind("click", function () {
                scope.$apply(function () {
                    scope.$broadcast(Events.DOCUMENT_CLICK);
                });
            });

            var $win = angular.element($window);

            angular.element($document).bind('mousewheel', _.throttle(function (e) {
                scope.$apply(function () {
                    if (e.wheelDelta <= 0) {
                        scope.$broadcast(Events.DOCUMENT_SCROLL_DOWN);
                    } else {
                        scope.$broadcast(Events.DOCUMENT_SCROLL_UP);
                    }
                });
            }, 1000));

            $win.on("resize", function (ev) {
                scope.$apply(function () {
                    scope.$broadcast(Events.WINDOW_RESIZE, ev);
                });
            });

            $win.on("focus", function (ev) {
                scope.$apply(function () {
                    scope.$broadcast(Events.WINDOW_FOCUS, ev);
                });
            });

            $win.on("blur", function (ev) {
                scope.$apply(function () {
                    scope.$broadcast(Events.WINDOW_BLUR, ev);
                });
            });
        }

        return { restrict: "A", link: linker };
    }
]);
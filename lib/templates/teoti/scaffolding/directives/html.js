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

            angular.element($document).bind('mousewheel', _.throttle(function (e) {
                scope.$apply(function () {
                    if (e.wheelDelta <= 0) {
                        scope.$broadcast(Events.DOCUMENT_SCROLL_DOWN);
                    } else {
                        scope.$broadcast(Events.DOCUMENT_SCROLL_UP);
                    }
                });
            }, 1000));

            angular.element($window).on("resize", function (ev) {
                scope.$broadcast(Events.WINDOW_RESIZE, ev);
            });
        }

        return { restrict: "A", link: linker };
    }
]);
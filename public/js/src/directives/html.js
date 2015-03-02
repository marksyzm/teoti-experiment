"use strict";

var angular = require("angular");

angular.module("teoti.directives").directive("html", [
    "Events",
    function (Events) {
        function linker (scope, element) {
            element.on("click", function () {
                scope.$apply(function () {
                    scope.$broadcast(Events.DOCUMENT_CLICK);
                });
            });
        }

        return { restrict: "A", link: linker };
    }
]);
"use strict";

var angular = require("angular");

angular.module("teoti.directives").directive("focusElement", [
    "$timeout", "$parse",
    function ($timeout, $parse) {
        function linker (scope, element, attrs) {
            var model = $parse(attrs.focusElement);
            scope.$watch(model, function(value) {
                if (value) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });

            element.on("blur", function() {
                scope.$apply(model.assign(scope, false));
            });
        }

        return { link: linker };
    }
]);
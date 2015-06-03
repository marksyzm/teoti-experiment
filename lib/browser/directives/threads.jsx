"use strict";

var angular = require("angular"),
    React = require("react"),
    Threads = require("../../shared/views/components/partials/threads.jsx");

angular.module("teoti.directives").directive("threads", [
    function () {
        function linker (scope, element) {
            scope.$watchCollection("threads.items", function (threadsItems) {
                if (threadsItems) {
                    React.render(<Threads threads={threadsItems} />, element[0]);
                }
            });

            scope.$on("$destroy", function () {
                if (scope.threads && scope.threads.items) {
                    scope.threads.items.length = 0;
                }
                React.unmountComponentAtNode(element[0]);
            });
        }

        return {
            link: linker,
            restrict: "A",
            scope: {
                threads: "="
            }
        };
    }
]);
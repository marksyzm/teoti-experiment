"use strict";

var angular = require("angular"),
    React = require("react"),
    Threads = require("../../../views/components/partials/threads.jsx");

angular.module("teoti.directives").directive("threads", [
    function () {
        function linker (scope, element) {
            scope.$watchCollection("threads", function (threads) {
                if (threads) {
                    React.render(<Threads threads={scope.threads} />, element.get(0));
                }
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
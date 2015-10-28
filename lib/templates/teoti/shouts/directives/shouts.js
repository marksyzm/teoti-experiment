"use strict";

var angular = require("angular");
var shoutTemplate = require("../views/shouts.html");

angular.module("teoti.shouts").directive("shouts", [
    'ShoutResource',
    function (ShoutResource) {
        function linker (scope) {
            function fetchShouts() {
                if (!scope.loading) return;

                ShoutResource.query()
                    .then(function (response) {
                        scope.loading = false;
                        if (!response.data.shouts) return;
                        scope.shouts = response.data.shouts;
                    }, function (reason) {
                        scope.loading = false;
                        scope.error = reason.data;
                    });
            }

            function init () {
                scope.shouts = null;
                scope.loading = scope.hasOwnProperty('loading') ? scope.loading : true;

                scope.$watch("shouts", function (shouts) {
                    scope.shoutsExist = shouts && shouts.length !== 0;
                });

                scope.$watch("loading", fetchShouts, true);
            }

            init();
        }

        return {
            link: linker,
            templateUrl: shoutTemplate,
            restrict: "A",
            scope: {
                loading: "=?"
            }
        };
    }
]);
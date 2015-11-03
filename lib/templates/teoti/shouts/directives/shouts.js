"use strict";

var angular = require("angular");
var shoutTemplate = require("../views/shouts.html");

angular.module("teoti.shouts").directive("shouts", [
    'ShoutResource',
    function (ShoutResource) {
        function linker (scope) {
            function fetchShouts () {
                if (!scope.loading) return;

                return ShoutResource.query()
                    .then(function (response) {
                        scope.loading = false;
                        if (!response.data.shouts) return;
                        scope.shouts = response.data.shouts;
                    }, function (reason) {
                        scope.loading = false;
                        scope.error = reason.data;
                    });
            }

            function submit () {
                if (!scope.formShout.$valid) return;
                scope.submitting = true;
                ShoutResource.save(scope.shout).then(function () {
                    return fetchShouts();
                }).then(function () {
                    scope.submitting = false;
                    scope.shout = null;
                },function () {
                    scope.submitting = false;
                });
            }

            function onKeyDown ($event) {
                if ($event.keyCode === 13 && !$event.shiftKey) {
                    $event.preventDefault();
                    return submit();
                }
            }

            function init () {
                scope.shouts = null;
                scope.loading = scope.hasOwnProperty('loading') ? scope.loading : true;

                scope.onKeyDown = onKeyDown;

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
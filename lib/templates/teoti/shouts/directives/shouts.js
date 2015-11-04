"use strict";

var angular = require("angular");
var shoutTemplate = require("../views/shouts.html");

angular.module("teoti.shouts").directive("shouts", [
    'ShoutResource', 'AccountResource',
    function (ShoutResource, AccountResource) {
        function linker (scope) {
            function fetchShouts () {
                if (!scope.loading) return;

                return ShoutResource.query()
                    .then(function (response) {
                        scope.loading = false;
                        if (!response.data.shouts) return;
                        scope.shouts = response.data.shouts.reverse();
                        scope.submitting = false;
                        return response;
                    }, function (reason) {
                        scope.submitting = false;
                        scope.loading = false;
                        scope.error = reason.data;
                    });
            }

            function failSubmit () {
                scope.loading = false;
                scope.submitting = false;
            }

            function getShoutObject () {
                return { user: AccountResource.account };
            }

            function submit () {
                if (!scope.formShout.$valid) return;
                scope.submitting = true;
                scope.loading = true;
                ShoutResource.save(scope.shout).then(function () {
                    return fetchShouts();
                }, failSubmit).then(function () {
                    scope.shout = getShoutObject();
                }, failSubmit);
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
                scope.shout = getShoutObject();

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
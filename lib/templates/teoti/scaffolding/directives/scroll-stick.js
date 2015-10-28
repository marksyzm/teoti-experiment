"use strict";

var angular = require("angular");
var _ = require("lodash");

angular.module("teoti.scaffolding").directive("scrollStick", [
    "$window",
    function ($window) {
        function link (scope, element) {
            var lastScrollTop;
            var lastOffsetHeight;
            var el = element[0];
            var threshold = 5;

            function scrollElementToBottom () {
                element.scrollTop(el.scrollHeight - el.offsetHeight, 250);
            }

            function setVars () {
                lastScrollTop = el.scrollTop;
                lastOffsetHeight = el.offsetHeight;
            }

            function checkScrollPos () {
                if (lastScrollTop >= el.scrollHeight - el.offsetHeight - threshold) {
                    scrollElementToBottom();
                }
            }

            function init () {
                scrollElementToBottom();
                setVars();

                element.on("mousewheel", setVars);

                angular.element($window).on("resize", _.debounce(setVars, 500));

                scope.$watch("scrollStickChange", function (change) {
                    if (change) checkScrollPos();
                });

                scope.$on("$destroy", function () {
                    element.off("mousewheel", checkScrollPos);
                    $window.off("resize", setVars);
                });

                scope.force = scope.hasOwnProperty("force") ? scope.force : true;

                scope.$watch("force", function (newForce, oldForce) {
                    if (newForce === oldForce || !newForce) return;
                    scrollElementToBottom();
                    scope.force = false;
                });
                scope.$watch("check", function (newCheck, oldCheck) {
                    if (newCheck === oldCheck || !newCheck) return;
                    checkScrollPos();
                    scope.check = false;
                });
            }

            init();
        }

        return {
            scope: {
                force: '=?scrollStickForce',
                check: '=?scrollStickCheck'
            },
            link: link,
            restrict: "A"
        }
    }
]);
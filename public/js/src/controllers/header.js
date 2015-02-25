"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("Header", [
    "$scope",
    function ($scope) {
        $scope.toggleNavigation = function () {
            $scope.showNavigation = !$scope.showNavigation;
        };
    }
]);
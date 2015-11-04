"use strict";

var angular = require("angular");

angular.module("teoti.header").controller("AccountMenu",[
    "$scope",
    function ($scope) {
        $scope.menuClick = function ($event) {
            $event.stopPropagation();
        };
    }
]);
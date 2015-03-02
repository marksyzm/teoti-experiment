"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("AccountMenu",[
    "$scope",
    function ($scope) {
        $scope.menuClick = function ($event) {
            $event.stopPropagation();
        };
    }
]);
"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("Users", [
    "$scope",
    function ($scope) {
        $scope.sausage = {
            a: 1, b: 2, 3: 3
        };
    }
]);
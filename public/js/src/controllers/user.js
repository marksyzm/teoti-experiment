"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("User", [
    "$scope",
    function ($scope) {
        $scope.user = null;
    }
]);
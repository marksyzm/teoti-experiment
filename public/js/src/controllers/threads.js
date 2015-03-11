"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("Threads", [
    "$scope",
    function ($scope) {
        //console.log($scope.thread);
        angular.extend($scope, $scope.thread);
        $scope.thread = null;
    }
]);
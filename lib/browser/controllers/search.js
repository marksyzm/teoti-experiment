"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("Search", [
    "$scope",
    function ($scope) {
        $scope.searchActive = false;
        $scope.form = null;

        $scope.setForm = function (form) {
            $scope.form = form;
        };

        $scope.submit = function () {
            $scope.searchActive = !$scope.searchActive;
        };
    }
]);
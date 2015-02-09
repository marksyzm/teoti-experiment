"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("Groups", [
    "$scope", "$http", "$route",
    function ($scope, $http) {
        $scope.groups = null;

        $scope.fetchGroups = function () {
            $http.get("/api/group")
                .then(function (response) {
                    if (response.data) {
                        $scope.groups = response.data;
                    }
                });
        };
    }
]);
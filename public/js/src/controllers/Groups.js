"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("Groups", [
    "$scope", "$http", "$window",
    function ($scope, $http, $window) {
        $scope.groups = null;

        $scope.fetchGroups = function () {
            return $http.get("/api/group")
                .then(function (response) {
                    if (response.data) {
                        $scope.groups = response.data;
                    }
                });
        };

        $scope.deleteGroup = function (group) {
            if ($window.confirm("Are you sure you want to delete this group?") && $window.confirm("Really?")) {
                $http.delete("/api/group/"+group._id)
                    .then(function () {
                        return $scope.fetchGroups();
                    });
            }
        }
    }
]);
"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("Forums", [
    "$scope", "$window", "ForumResource", "$stateParams",
    function ($scope, $window, ForumResource, $stateParams) {
        $scope.forums = [];
        $scope.parent = Number($stateParams.parent) || -1;

        $scope.fetch = function (parent) {
            return ForumResource.query(parent)
                .then(function (response) {
                    if (response.data) {
                        $scope.forums = response.data;
                    }
                });
        };

        $scope.delete = function (forum) {
            if ($window.confirm("Are you sure you want to delete this forum?") && $window.confirm("Really?")) {
                ForumResource.delete(forum._id)
                    .then(function () {
                        return $scope.fetchForums();
                    });
            }
        };
    }
]);
"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("Forums", [
    "$scope", "$window", "ForumResource",
    function ($scope, $window, ForumResource) {
        $scope.forums = [];

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
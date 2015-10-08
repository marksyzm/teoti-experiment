"use strict";

var angular = require("angular");

angular.module("teoti.manager").controller("Groups", [
    "$scope", "$window", "GroupResource",
    function ($scope, $window, GroupResource) {
        $scope.groups = null;

        $scope.fetchGroups = function () {
            return GroupResource.query()
                .then(function (response) {
                    if (response.data) {
                        $scope.groups = response.data;
                    }
                });
        };

        $scope.deleteGroup = function (group) {
            if ($window.confirm("Are you sure you want to delete this group?") && $window.confirm("Really?")) {
                GroupResource.delete(group._id)
                    .then(function () {
                        return $scope.fetchGroups();
                    });
            }
        };
    }
]);
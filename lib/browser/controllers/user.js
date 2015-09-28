"use strict";

var angular = require("angular");
var _ = require("lodash");

angular.module("teoti.controllers").controller("User", [
    "$scope", "$window", "UserResource", "GroupResource",
    function ($scope, $window, UserResource, GroupResource) {
        $scope.user = null;
        $scope.editMode = false;

        $scope.groups = [];

        GroupResource.query().then(function (response) {
            $scope.groups = response.data;
        });

        $scope.$on("autocomplete-select", function (ev, user) {
            $scope.user = user;
            $scope.editMode = true;
        });

        $scope.submit = function () {
            if ($scope.editMode) {
                UserResource.update($scope.user._id, $scope.user)
                    .then(function () {
                        $scope.cancelEditMode();
                    });
                return;
            }

            UserResource.save($scope.user)
                .then(function () {
                    $scope.cancelEditMode();
                });
        };

        $scope.getUsers = function (val) {
            return UserResource.query({
                filter: val
            }).then(function(response){
                return response.data.users.items;
            });
        };

        $scope.cancelEditMode = function () {
            $scope.editMode = false;
            $scope.user = null;
        };

        $scope.deleteUser = function () {
            if ($window.confirm("Are you sure?") && $window.confirm("Really?")) {
                UserResource.delete($scope.user._id).then(function () {
                    $scope.cancelEditMode();
                });
            }
        };
    }
]);
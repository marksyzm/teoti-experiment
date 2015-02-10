"use strict";

var angular = require("angular");

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
            UserResource.save($scope.user)
                .then(function () {
                    $scope.user = null;
                    $window.alert("WORKED");
                });
        };

        $scope.cancelEditMode = function () {
            $scope.editMode = false;
            $scope.user = {};
        };
    }
]);
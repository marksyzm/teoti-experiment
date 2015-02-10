"use strict";

var angular = require("angular"),
    settings = require("../../../../config/app.json");

angular.module("teoti.controllers").controller("GroupEdit", [
    "$scope", "$route", "$location", "GroupResource",
    function ($scope, $route, $location, GroupResource) {
        $scope.edit = false;
        $scope.group = {};
        $scope.permissionTypes = settings.permissions.types;

        function create (group) {
            GroupResource.save(group)
                .then(function () {
                    $location.path("/manage/groups");
                });
        }

        function update (group) {
            GroupResource.update(group)
                .then(function () {
                    $location.path("/manage/groups");
                });
        }

        var groupId = $route.current.params.groupId;
        if (groupId) {
            GroupResource.get(groupId)
                .then(function (response) {
                    if (response.data && response.data._id) {
                        $scope.edit = true;
                        $scope.group = response.data;
                    }
                });
        }

        $scope.submit = function () {
            if ($scope.edit) {
                update(groupId, $scope.group);
                return;
            }

            create($scope.group);
        };
    }
]);
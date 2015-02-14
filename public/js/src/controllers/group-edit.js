"use strict";

var angular = require("angular"),
    settings = require("../../../../config/app.json");

angular.module("teoti.controllers").controller("GroupEdit", [
    "$scope", "$route", "$location", "GroupResource",
    function ($scope, $route, $location, GroupResource) {
        $scope.edit = false;
        $scope.group = {};
        $scope.permissionTypes = settings.permissions.types;

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
            var http;
            if ($scope.edit) {
                http = GroupResource.update(groupId, $scope.group);
            } else {
                http = GroupResource.save($scope.group);
            }

            http.then(function () {
                $location.path("/manage/groups");
            });
        };
    }
]);
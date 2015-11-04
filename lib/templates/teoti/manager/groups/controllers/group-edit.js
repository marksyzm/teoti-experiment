"use strict";

var angular = require("angular");

angular.module("teoti.manager").controller("GroupEdit", [
    "$scope", "$stateParams", "$location", "GroupResource", "Config",
    function ($scope, $stateParams, $location, GroupResource, Config) {
        $scope.edit = false;
        $scope.group = {};
        $scope.permissionTypes = Config.permissions.types;

        var groupId = parseInt($stateParams.groupId, 10);
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
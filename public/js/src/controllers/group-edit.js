"use strict";

var angular = require("angular"),
    settings = require("../../../../config/app.json");

angular.module("teoti.controllers").controller("GroupEdit", [
    "$scope", "$route", "$http", "$location",
    function ($scope, $route, $http, $location) {
        $scope.edit = false;
        $scope.group = {};
        $scope.permissionTypes = settings.permissions.types;

        function create (group) {
            $http.post("/api/group", group)
                .then(function () {
                    $location.path("/manage/groups");
                });
        }

        function update (group) {
            $http.put("/api/group/"+groupId, group)
                .then(function () {
                    //if ($window.confirm("Group updated. Click okay to go to groups or cancel to continue editing.")) {
                        $location.path("/manage/groups");
                    //}
                });
        }

        var groupId = $route.current.params.groupId;
        if (groupId) {
            $http.get("/api/group/"+groupId)
                .then(function (response) {
                    if (response.data && response.data._id) {
                        $scope.edit = true;
                        $scope.group = response.data;
                    }
                });
        }

        $scope.submit = function () {
            if ($scope.edit) {
                update($scope.group);
                return;
            }

            create($scope.group);
        };
    }
]);
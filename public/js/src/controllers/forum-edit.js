"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("ForumEdit", [
    "$scope", "$route", "$location", "ForumResource", "GroupResource",
    function ($scope, $route, $location, ForumResource, GroupResource) {
        $scope.edit = false;
        $scope.forum = {};

        $scope.groups = [];

        GroupResource.query().then(function (response) {
           $scope.groups = response.data;
        });

        var forumId = $route.current.params.forumId;
        if (forumId) {
            ForumResource.get(forumId)
                .then(function (response) {
                    if (response.data && response.data._id) {
                        $scope.edit = true;
                        $scope.forum = response.data;
                    }
                });
        }

        $scope.submit = function () {
            var http;
            if ($scope.edit) {
                http = ForumResource.update(forumId, $scope.forum);
            } else {
                http = ForumResource.save($scope.forum);
            }

            http.then(function () {
                $location.path("/manage/forums");
            });
        };
    }
]);
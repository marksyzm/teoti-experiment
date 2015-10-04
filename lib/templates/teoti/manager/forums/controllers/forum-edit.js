"use strict";

var angular = require("angular");

angular.module("teoti.manager").controller("ForumEdit", [
    "$scope", "$stateParams", "$location", "ForumResource", "GroupResource",
    function ($scope, $stateParams, $location, ForumResource, GroupResource) {
        $scope.edit = false;
        $scope.forum = {};

        $scope.groups = [];

        GroupResource.query().then(function (response) {
           $scope.groups = response.data;
        });

        var forumId = $stateParams.forumId;
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
"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("NavigationMenu", [
    "$scope", "$rootScope", "ForumResource",
    function ($scope, $rootScope, ForumResource) {
        $scope.getChildren = function (forumId) {
            ForumResource.getCollection(forumId);
        };

        $scope.menuClick = function ($event) {
            $event.stopPropagation();
        };
    }
]);
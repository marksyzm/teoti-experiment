"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("NavigationMenu", [
    "$scope", "ForumResource",
    function ($scope, ForumResource) {
        $scope.getChildren = function (forumId) {
            ForumResource.getCollection(forumId);
        };
    }
]);
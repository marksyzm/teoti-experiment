"use strict";

var angular = require("angular"),
    _ = require("lodash");

angular.module("teoti.controllers").controller("Forum", [
    "$scope", "$location", "$route",
    function ($scope, $location, $route) {
        $scope.forumSlug = $route.current.params.forumSlug;
        $scope.page = $location.search().page;
    }
]);
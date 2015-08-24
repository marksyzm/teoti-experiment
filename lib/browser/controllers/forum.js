"use strict";

var angular = require("angular"),
    _ = require("lodash");

angular.module("teoti.controllers").controller("Forum", [
    "$scope", "$state", "$stateParams", "$location",
    function ($scope, $state, $stateParams, $location) {
        $scope.forumSlug = $stateParams.forumSlug ? $stateParams.forumSlug : null;
        $scope.page = $stateParams.page ? parseInt($stateParams.page, 10) : 1;

        $scope.$watch("page", function (page, oldPage) {
            if (oldPage && oldPage !== page) {
                $state.go("forum", { page: page.toString() }, { notify: false });
            }
        });
    }
]);
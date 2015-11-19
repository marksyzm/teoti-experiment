"use strict";

var angular = require("angular");

angular.module("teoti.thread").controller("Thread", [
    "$scope", "$state", "$stateParams", "AccountResource",
    function ($scope, $state, $stateParams, AccountResource) {
        $scope.activeThreads = null;
        $scope.forumSlug = $stateParams.forumSlug || null;
        $scope.threadId = $stateParams.threadId || null;
        $scope.page = $stateParams.page ? parseInt($stateParams.page, 10) : 1;

        $scope.$watch("page", function (page, oldPage) {
            if (oldPage && oldPage !== page) {
                $state.go("thread", { page: page.toString() }, { notify: false });
            }
        });
    }
]);
"use strict";

var angular = require("angular");

angular.module("teoti.thread").controller("Thread", [
    "$scope", "$state", "$stateParams",
    function ($scope, $state, $stateParams) {
        $scope.activeThreads = null;
        $scope.forumSlug = $stateParams.forumSlug || null;
        $scope.threadId = Number($stateParams.threadId) || null;
        $scope.page = $stateParams.page ? Number($stateParams.page) : null;

        $scope.$watch("page", function (page, oldPage) {
            if (oldPage !== page) {
                $state.go("thread", { page: page.toString() }, { notify: false });
            }
        });
    }
]);
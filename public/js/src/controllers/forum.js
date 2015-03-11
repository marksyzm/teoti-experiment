"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("Forum", [
    "$scope", "$rootScope", "ThreadsResource",
    function ($scope, $rootScope, ThreadsResource) {
        $scope.forum = null;
        $scope.threads = null;

        $scope.fetchThreads = function () {
            ThreadsResource.query().then(function (response) {
                $scope.forum = response.data.forum;
                $scope.threads = response.data.threads;
            });
        };

        $scope.fetchThreads();
    }
]);
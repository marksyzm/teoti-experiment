"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("Forum", [
    "$scope", "$rootScope", "$timeout", "ThreadsResource",
    function ($scope, $rootScope, $timeout, ThreadsResource) {
        $scope.forum = null;
        $scope.threads = [];

        $scope.fetchThreads = function () {
            ThreadsResource.query().then(function (response) {
                console.log("HERE");
                $scope.forum = response.data.forum;
                angular.forEach(response.data.threads, function (thread) {
                    $timeout(function (){
                        $scope.threads.push(thread);
                    });
                });
            });
        };

        $scope.fetchThreads();
    }
]);
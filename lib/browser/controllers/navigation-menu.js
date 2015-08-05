"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("NavigationMenu", [
    "$scope", "$rootScope", "ForumResource", "ThreadsResource",
    function ($scope, $rootScope, ForumResource, ThreadsResource) {
        function fetchSpecials () {
            var areThreads = true;
            var dateLimit = null;
            var sort;
            switch ($scope.account.settings.special) {
                default:
                    dateLimit = 2*24*60*60*1000;
                    sort = 'score';
                    break;
            }
            if (areThreads) {
                ThreadsResource.query(null, $scope.page, 'navigation', dateLimit, sort).then(function (response) {
                    $scope.specials = response.data.threads;
                });
            }
        };

        $scope.specials = null;

        $scope.getChildren = function (forumId) {
            ForumResource.getCollection(forumId);
        };

        $scope.menuClick = function ($event) {
            $event.stopPropagation();
        };

        $scope.init = function () {
            fetchSpecials();
        };
    }
]);
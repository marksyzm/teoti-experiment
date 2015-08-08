"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("NavigationMenu", [
    "$scope", "$rootScope", "ForumResource", "ThreadsResource",
    function ($scope, $rootScope, ForumResource, ThreadsResource) {
        function fetchSpecials () {
            var areThreads = true;
            var params = { page: $scope.page, limit: 'navigation' };

            switch ($scope.account.settings.special) {
                case "random":
                    params.random = true;
                    break;
                default:
                    // dateLimit will be set by another dropdown later. To be stored in user details.
                    params.dateLimit = 2*24*60*60*1000;
                    params.sort = 'score';
                    break;
            }
            if (areThreads) {
                ThreadsResource.query(null, params).then(function (response) {
                    $scope.specials = response.data.threads;
                });
            }
        };

        $scope.getItemsTemplate = function () {
            return 'views/directives/nav/'+ $scope.account.settings.special + '.html';
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
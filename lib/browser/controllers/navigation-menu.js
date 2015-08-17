"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("NavigationMenu", [
    "$scope", "$rootScope", "ForumResource", "AccountResource",
    function ($scope, $rootScope, ForumResource, AccountResource) {
        $scope.dateLimit = 2*24*60*60*1000;
        $scope.specials = [
            { value: 'hot', name: 'Hot' },
            { value: 'random', name: 'Random' },
            { value: 'sticky', name: 'Sticky' },
            { value: 'scores', name: 'Scores' }
        ];

        $scope.getItemsTemplate = function () {
            return 'views/directives/nav/'+ $scope.account.settings.special + '.html';
        };

        $scope.getChildren = function (forumId) {
            ForumResource.getCollection(forumId);
        };

        $scope.menuClick = function ($event) {
            $event.stopPropagation();
        };

        $scope.$watch('account.settings.special', function () {
            if (AccountResource.account._id) {
                AccountResource.update();
            }
        });
    }
]);
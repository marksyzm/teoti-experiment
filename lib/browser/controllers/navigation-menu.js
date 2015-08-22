"use strict";

var angular = require("angular");
var _ = require("lodash");

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
        $scope.menu = {
            isopen: false
        };

        $scope.getItemsTemplate = function () {
            return 'views/directives/nav/'+ AccountResource.account.settings.special + '.html';
        };

        $scope.getChildren = function ($event, forumId) {
            $event.stopPropagation();
            ForumResource.getCollection(forumId);
        };

        $scope.keepMenuOpen = function ($event) {
            $event.stopPropagation();
        };

        $scope.closeMenu = function () {
            $scope.showNavigation = false;
        };

        $scope.currentSpecial = function (prop) {
            var prop = prop || 'name';
            var special = _.find($scope.specials, function (special) {
                return special.value === AccountResource.account.settings.special;
            });
            return special[prop];
        };

        $scope.setSpecial = function ($event, specialValue) {
            $event.stopPropagation();
            AccountResource.account.settings.special = specialValue;
            $scope.menu.isopen = false;
        };

        $scope.$watch('account.settings.special', function () {
            if (AccountResource.account._id) {
                AccountResource.update();
            }
        });
    }
]);
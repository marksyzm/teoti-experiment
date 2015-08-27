"use strict";

var angular = require("angular");
var _ = require("lodash");

angular.module("teoti.controllers").controller("NavigationMenu", [
    "$scope", "$rootScope", "ForumResource", "AccountResource", "Config",
    function ($scope, $rootScope, ForumResource, AccountResource, Config) {
        $scope.specials = [
            { value: 'hot', name: 'Hot' },
            { value: 'random', name: 'Random' },
            { value: 'sticky', name: 'Sticky' },
            { value: 'scores', name: 'Scores' }
        ];

        $scope.dateLimits = Config.dateLimits;
        $scope.currentDateLimit = $scope.dateLimits[0].value;

        $scope.menu = {
            isOpen: false,
            isOpenSecondary: false,
            loading: false
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

        $scope.current = function (itemValue, items) {
            var item = _.find(items, function (item) {
                return item.value === itemValue;
            });
            return item ? item.name : null;
        };

        $scope.setSpecial = function ($event, specialValue) {
            $event.stopPropagation();
            AccountResource.account.settings.special = specialValue;
            $scope.menu.isOpen = false;
        };

        $scope.setDateLimit = function ($event, dateLimitValue) {
            $event.stopPropagation();
            $scope.currentDateLimit = dateLimitValue;
            $scope.menu.isOpenSecondary = false;
        };

        $scope.$watch('account.settings.special', function () {
            if (AccountResource.account._id) {
                AccountResource.update();
            }
        });

        $scope.refresh = function ($event) {
            $event.stopPropagation();
            $scope.menu.loading = true;
        };
    }
]);
"use strict";

var angular = require("angular");
var _ = require("lodash");
var templates = require.context('../views/', true, /\.(html|svg)$/);
templates.keys().forEach(function(key) { templates(key); });

angular.module("teoti.header").controller("NavigationMenu", [
    "$scope", "$rootScope", "ForumResource", "AccountResource", "Config", "$state",
    function ($scope, $rootScope, ForumResource, AccountResource, Config, $state) {
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
            var account = AccountResource.account;
            var fileName = account.special || $scope.specials[0].value;
            return require('../views/nav/'+ fileName + '.html');
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
            AccountResource.account.special = specialValue;
            $scope.menu.isOpen = false;
        };

        $scope.setDateLimit = function ($event, dateLimitValue) {
            $event.stopPropagation();
            $scope.currentDateLimit = dateLimitValue;
            $scope.menu.isOpenSecondary = false;
        };

        $scope.$watchGroup(['account.special', 'account.view'], function () {
            if (AccountResource.account._id) AccountResource.update();
        });

        $scope.refresh = function ($event) {
            $event.stopPropagation();
            $scope.menu.loading = true;
        };

        $scope.setView = function ($event, view) {
            $event.stopPropagation();
            AccountResource.account.view = view;
            $scope.menu.isOpen = false;
        };

        $scope.include = function (filePath, ext) {
            var bundlePath;
            ext = ext || 'html';
            if (ext === 'svg') {
                bundlePath = require('../views/svg/'+filePath+'.svg');
            } else {
                bundlePath = require('../views/'+filePath+'.html');
            }
            return bundlePath;
        };
    }
]);
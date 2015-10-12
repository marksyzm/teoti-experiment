"use strict";

var angular = require("angular");

var templates = require.context('../views/', true, /\.html$/);
templates.keys().forEach(templates);
templates = require.context('../views/', true, /\.svg$/);
templates.keys().forEach(templates);

angular.module("teoti.header").controller("Header", [
    "$scope", "$rootScope", "Events", "AccountResource", "$location",
    function ($scope, $rootScope, Events, AccountResource, $location) {
        $scope.currentPage = "Home";
        $scope.showSecondary = true;

        $scope.toggleNavigation = function ($event) {
            $rootScope.showNavigation = !$rootScope.showNavigation;
            $rootScope.showAccount = false;
            $rootScope.currentNavigation = "navigation";
            $event.stopPropagation();
        };

        $scope.toggleAccount = function ($event, accountView) {
            $event.stopPropagation();
            $event.preventDefault();

            $rootScope.showAccount = !$rootScope.showAccount;
            $rootScope.currentNavigation = "account";
            $rootScope.accountView = accountView;
            $rootScope.showNavigation = false;
        };

        $scope.$on(Events.DOCUMENT_CLICK, function () {
            $rootScope.showNavigation = false;
            $rootScope.showAccount = false;
        });

        $scope.goto = function (url) {
            $location.path(url);
            $rootScope.showNavigation = false;
            $rootScope.showAccount = false;
        };

        $scope.$on(Events.DOCUMENT_SCROLL_DOWN, function () {
            $scope.$apply(function () {
                $scope.showSecondary = false;
            });
        });
        $scope.$on(Events.DOCUMENT_SCROLL_UP, function () {
            $scope.$apply(function () {
                $scope.showSecondary = true;
            });
        });

        $scope.currentAccountView = function (accountView) {
            return $scope.accountView === accountView;
        };

        $scope.toggleActive = function (accountProp, accountView) {
            return (accountProp && AccountResource.account[accountProp]) ||
                ($scope.currentNavigation === 'account' && accountView === $scope.accountView);
        };

        $scope.include = function (filePath, ext) {
            var bundlePath;
            ext = ext || 'html';
            console.log('HERE', filePath);
            if (ext === 'svg') {
                bundlePath = require('../views/'+filePath+'.svg');
            } else {
                bundlePath = require('../views/'+filePath+'.html');
            }
            console.log('HERE', filePath, bundlePath);
            return bundlePath;
        };
    }
]);
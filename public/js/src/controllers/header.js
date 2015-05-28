"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("Header", [
    "$scope", "Events", "AccountResource", "$location",
    function ($scope, Events, AccountResource, $location) {
        $scope.currentNav = "Home";
        $scope.showNavigation = false;
        $scope.showAccount = false;
        $scope.accountView = "settings";

        $scope.toggleNavigation = function ($event) {
            $scope.showNavigation = !$scope.showNavigation;
            $scope.showAccount = false;
            $event.stopPropagation();
        };

        $scope.toggleAccount = function ($event, accountView) {
            $event.stopPropagation();
            $event.preventDefault();

            if (!$scope.showAccount || ($scope.showAccount && $scope.accountView === accountView)) {
                $scope.showAccount = !$scope.showAccount;
            }

            if ($scope.showAccount) {
                $scope.accountToggle = accountView;
            } else {
                $scope.accountToggle = "";
            }
            $scope.accountView = accountView;

            $scope.showNavigation = false;
        };

        $scope.$on(Events.DOCUMENT_CLICK, function () {
            $scope.showNavigation = false;
            $scope.showAccount = false;
            $scope.accountToggle = "";
        });

        $scope.goto = function (url) {
            $location.path(url);
            $scope.showNavigation = false;
            $scope.showAccount = false;
            $scope.accountToggle = "";
        };

        $scope.currentAccountView = function (accountView) {
            return $scope.accountView === accountView;
        };

        $scope.toggleActive = function (accountProp, accountToggle) {
            return (accountProp && AccountResource.account[accountProp]) || accountToggle === $scope.accountToggle;
        };
    }
]);
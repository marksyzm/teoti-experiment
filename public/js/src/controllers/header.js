"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("Header", [
    "$scope", "Events", "AccountResource",
    function ($scope, Events, AccountResource) {
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
                $scope.accountView = accountView;
            } else {
                $scope.accountView = "";
            }

            $scope.showNavigation = false;
        };

        $scope.$on(Events.DOCUMENT_CLICK, function () {
            $scope.showNavigation = false;
            $scope.showAccount = false;
            $scope.accountView = "";
        });

        $scope.currentAccountView = function (accountView) {
            return $scope.accountView === accountView;
        };

        $scope.toggleActive = function (accountProp, accountView) {
            return (accountProp && AccountResource.account[accountProp]) || accountView === $scope.accountView;
        };
    }
]);
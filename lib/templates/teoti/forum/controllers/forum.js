"use strict";

var angular = require("angular");

var templates = require.context('../views/partials/', false, /\.html$/);
templates.keys().forEach(templates);

angular.module("teoti.forum").controller("Forum", [
    "$scope", "$state", "$stateParams", "AccountResource",
    function ($scope, $state, $stateParams, AccountResource) {
        $scope.activeThreads = null;
        $scope.forumSlug = $stateParams.forumSlug || null;
        $scope.page = $stateParams.page ? parseInt($stateParams.page, 10) : 1;

        $scope.$watch("page", function (page, oldPage) {
            if (oldPage && oldPage !== page) {
                $state.go("forum", { page: page.toString() }, { notify: false });
            }
        });

        $scope.getAccountView = function (defaultView) {
            var account = AccountResource.account;
            if (account && account.view) {
                return require('../views/partials/'+account.view+'.html');
            }
            return require('../views/partials/'+defaultView+'.html');
        };

        $scope.setActiveThreads = function (activeThreads) {
            $scope.activeThreads = activeThreads;
        };
    }
]);
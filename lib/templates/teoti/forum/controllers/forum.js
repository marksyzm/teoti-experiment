"use strict";

var angular = require("angular");
var _ = require("lodash");

var templates = require.context('../views/partials/', false, /\.html$/);
templates.keys().forEach(function(key) { templates(key); });

angular.module("teoti.forum").controller("Forum", [
    "$scope", "$state", "$stateParams", "AccountResource",
    function ($scope, $state, $stateParams, AccountResource) {
        $scope.activeThreads = null;
        $scope.forumSlug = $stateParams.forumSlug ? $stateParams.forumSlug : null;
        $scope.page = $stateParams.page ? parseInt($stateParams.page, 10) : 1;

        $scope.$watch("page", function (page, oldPage) {
            if (oldPage && oldPage !== page) {
                $state.go("forum", { page: page.toString() }, { notify: false });
            }
        });

        $scope.getAccountView = function (defaultView) {
            if (AccountResource.account.settings) {
                return require('../views/partials/'+AccountResource.account.settings.view+'.html');
            }
            return require('../views/partials/'+defaultView+'.html');
        };

        $scope.setActiveThreads = function (activeThreads) {
            $scope.activeThreads = activeThreads;
        };
    }
]);
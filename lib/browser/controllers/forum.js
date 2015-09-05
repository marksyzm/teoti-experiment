"use strict";

var angular = require("angular"),
    _ = require("lodash");

angular.module("teoti.controllers").controller("Forum", [
    "$scope", "$state", "$stateParams", "AccountResource",
    function ($scope, $state, $stateParams, AccountResource) {
        $scope.forumSlug = $stateParams.forumSlug ? $stateParams.forumSlug : null;
        $scope.page = $stateParams.page ? parseInt($stateParams.page, 10) : 1;

        $scope.$watch("page", function (page, oldPage) {
            if (oldPage && oldPage !== page) {
                $state.go("forum", { page: page.toString() }, { notify: false });
            }
        });

        $scope.getAccountView = function (defaultView) {
            if (AccountResource.account.settings) {
                return 'views/partials/forum/'+AccountResource.account.settings.view+'.html';
            }
            return 'views/partials/forum/'+defaultView+'.html';
        };
    }
]);
'use strict';

var angular = require('angular');

angular.module('teoti.scaffolding').run([
    '$rootScope', '$location', 'AccountResource', 'ForumResource',
    function ($rootScope, $location, AccountResource, ForumResource) {
        $rootScope.account = AccountResource.account;
        AccountResource.get();

        $rootScope.location = $location;

        // this needs to go
        $rootScope.forums = ForumResource.forums;
        ForumResource.getCollection(-1);

        $rootScope.currentNavigation = null;
        $rootScope.showNavigation = false;
        $rootScope.showAccount = false;
        $rootScope.accountView = 'settings';
    }
]);
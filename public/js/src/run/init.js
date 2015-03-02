"use strict";

var angular = require("angular");

angular.module("teoti.run").run([
    "$rootScope", "AccountResource", "ForumResource", "Settings",
    function ($rootScope, AccountResource, ForumResource, Settings) {
        $rootScope.account = AccountResource.account;
        AccountResource.get();

        $rootScope.forums = ForumResource.forums;
        ForumResource.getCollection(-1);

        $rootScope.settings = Settings;
    }
]);
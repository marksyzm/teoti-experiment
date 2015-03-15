"use strict";

var angular = require("angular");

angular.module("teoti.run").run([
    "$rootScope", "$location", "AccountResource", "ForumResource", "Settings",
    function ($rootScope, $location, AccountResource, ForumResource, Settings) {
        $rootScope.account = AccountResource.account;
        AccountResource.get();

        $rootScope.location = $location;

        $rootScope.forums = ForumResource.forums;
        ForumResource.getCollection(-1);

        $rootScope.settings = Settings;
    }
]);
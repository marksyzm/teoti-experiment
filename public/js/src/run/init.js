"use strict";

var angular = require("angular");

angular.module("teoti.run").run([
    "$rootScope", "AccountResource", "Settings",
    function ($rootScope, AccountResource, Settings) {
        $rootScope.account = AccountResource;
        AccountResource.get();

        $rootScope.currentNav = "Home";

        $rootScope.settings = Settings;
    }
]);
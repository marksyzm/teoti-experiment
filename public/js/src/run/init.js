"use strict";

var angular = require("angular");

angular.module("teoti.run").run([
    "$rootScope", "AccountResource",
    function ($rootScope, AccountResource) {
        $rootScope.account = AccountResource;
        AccountResource.get();

        $rootScope.currentNav = "Home";
    }
]);
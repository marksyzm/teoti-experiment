define([
    "angular",
    "angular-ui-router"
],function(angular) {
    "use strict";

    return angular.module("EquensClientPortal").config([
        "$httpProvider",
        function ($httpProvider) {
            $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        }
    ]);
});

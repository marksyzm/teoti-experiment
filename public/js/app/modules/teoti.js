define([
    "angular"
], function (angular) {
    "use strict";

    angular.module("teoti-service",[]);
    angular.module("teoti-controller",[]);
    angular.module("teoti-directive",[]);
    angular.module("teoti-filter",[]);
    angular.module("teoti-run",[]);
    angular.module("teoti-config",[]);

    return angular.module("teoti", [
        "teoti-service",
        "teoti-controller",
        "teoti-directive",
        "teoti-filter",
        "teoti-run",
        "teoti-config"
    ]);
});
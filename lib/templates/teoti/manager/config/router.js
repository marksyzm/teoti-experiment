"use strict";

var angular = require("angular");

angular.module("teoti.manager").config([
    "$stateProvider",
    function ($stateProvider) {
        $stateProvider
            .state("manage", {
                url: "/manage",
                templateUrl: require("../views/manage.html"),
                data: { title: "Admin System" }
            });
    }
]);
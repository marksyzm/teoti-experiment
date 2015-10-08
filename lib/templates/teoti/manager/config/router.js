"use strict";

var angular = require("angular");
var managerTemplateUrl = require("../views/manage.html");

angular.module("teoti.manager").config([
    "$stateProvider",
    function ($stateProvider) {
        $stateProvider
            .state("manage", {
                url: "/manage",
                templateUrl: managerTemplateUrl,
                data: { title: "Admin System" }
            });
    }
]);
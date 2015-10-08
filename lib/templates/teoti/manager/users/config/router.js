"use strict";

var angular = require("angular");
var manageUsersTemplateUrl = require("../views/user.html");

angular.module("teoti.manager").config([
    "$stateProvider",
    function ($stateProvider) {
        $stateProvider
            .state("manageUser", {
                url: "/manage/user",
                controller: "User",
                templateUrl: manageUsersTemplateUrl,
                data: { title: "Edit user" }
            });
    }
]);
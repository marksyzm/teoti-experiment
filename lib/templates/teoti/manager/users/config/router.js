"use strict";

var angular = require("angular");

angular.module("teoti.manager").config([
    "$stateProvider",
    function ($stateProvider) {
        $stateProvider
            .state("manageUser", {
                url: "/manage/user",
                controller: "User",
                templateUrl: require("../views/user.html"),
                data: { title: "Edit user" }
            });
    }
]);
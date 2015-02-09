"use strict";

var angular = require("angular");

angular.module("teoti.config").config([
    "$routeProvider", "$locationProvider",
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/views/sign-in.html",
                title: "Home"
            })
            .when("/admin/groups", {
                controller: "Groups",
                templateUrl: "/views/admin/groups.html",
                title: "Groups"
            })
            .when("/admin/group", {
                controller: "GroupEdit",
                templateUrl: "/views/admin/group-edit.html",
                title: "Create group"
            })
            .when("/admin/group/:groupId", {
                controller: "GroupEdit",
                templateUrl: "/views/admin/group-edit.html",
                title: "Edit group"
            });

        $locationProvider.html5Mode(true);
    }
]);
"use strict";

var angular = require("angular");

angular.module("teoti.config").config([
    "$routeProvider", "$locationProvider",
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/views/home.html",
                title: "Home"
            })
            .when("/manage", {
                templateUrl: "/views/manage/index.html",
                title: "Manage"
            })
            .when("/sign-in", {
                templateUrl: "/views/sign-in.html",
                title: "Sign In"
            })
            .when("/manage/groups", {
                controller: "Groups",
                templateUrl: "/views/manage/groups.html",
                title: "Groups"
            })
            .when("/manage/group", {
                controller: "GroupEdit",
                templateUrl: "/views/manage/group-edit.html",
                title: "Create group"
            })
            .when("/manage/group/:groupId", {
                controller: "GroupEdit",
                templateUrl: "/views/manage/group-edit.html",
                title: "Edit group"
            })
            .when("/manage/user", {
                controller: "User",
                templateUrl: "/views/manage/user.html",
                title: "Edit user"
            });

        $locationProvider.html5Mode(true);
    }
]);
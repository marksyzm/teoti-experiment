"use strict";

var angular = require("angular");

angular.module("teoti.config").config([
    "$routeProvider", "$locationProvider",
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                controller: "Forum",
                templateUrl: "/view/forum",
                title: "Home"
            })
            .when("/submit", {
                templateUrl: "/views/submit.html",
                title: "Submit"
            })
            .when("/manage", {
                templateUrl: "/views/manage/index.html",
                title: "Manage"
            })
            .when("/sign-in", {
                templateUrl: "/views/sign-in.html",
                controller: "SignIn",
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
            .when("/manage/forums", {
                controller: "Forums",
                templateUrl: "/views/manage/forums.html",
                title: "Forums"
            })
            .when("/manage/forum", {
                controller: "ForumEdit",
                templateUrl: "/views/manage/forum-edit.html",
                title: "Create group"
            })
            .when("/manage/forum/:forumId", {
                controller: "ForumEdit",
                templateUrl: "/views/manage/forum-edit.html",
                title: "Edit forum"
            })
            .when("/manage/user", {
                controller: "User",
                templateUrl: "/views/manage/user.html",
                title: "Edit user"
            })
            .when("/:forumSlug/", {
                controller: "Forum",
                templateUrl: "/view/forum",
                title: "Home"
            });

        $locationProvider.html5Mode(true);
    }
]);
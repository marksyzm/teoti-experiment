"use strict";

var angular = require("angular");

angular.module("teoti.config").config([
    "$locationProvider", "$stateProvider",
    function ($locationProvider, $stateProvider) {
        $stateProvider
            .state("forum", {
                url: "*forumSlug/?page",
                controller: "Forum",
                templateUrl: "views/forum.html",
                params: {
                    page: { value: "1", squash: true },
                    forumSlug: { value: null }
                }
            })
            .state("signIn", {
                url: "/sign-in",
                templateUrl: "views/sign-in.html",
                controller: "SignIn",
                data: { title: "Sign In" }
            });

        /*$routeProvider
            .when("/", {
                controller: "Forum",
                templateUrl: "views/forum.html",
                title: "Home"
            })
            .when("/submit", {
                templateUrl: "views/submit.html",
                title: "Submit"
            })
            .when("/manage", {
                templateUrl: "views/manage/index.html",
                title: "Manage"
            })
            .when("/sign-in", {
                templateUrl: "views/sign-in.html",
                controller: "SignIn",
                title: "Sign In"
            })
            .when("/manage/groups", {
                controller: "Groups",
                templateUrl: "views/manage/groups.html",
                title: "Groups"
            })
            .when("/manage/group", {
                controller: "GroupEdit",
                templateUrl: "views/manage/group-edit.html",
                title: "Create group"
            })
            .when("/manage/group/:groupId", {
                controller: "GroupEdit",
                templateUrl: "views/manage/group-edit.html",
                title: "Edit group"
            })
            .when("/manage/forums", {
                controller: "Forums",
                templateUrl: "views/manage/forums.html",
                title: "Forums"
            })
            .when("/manage/forum", {
                controller: "ForumEdit",
                templateUrl: "views/manage/forum-edit.html",
                title: "Create group"
            })
            .when("/manage/forum/:forumId", {
                controller: "ForumEdit",
                templateUrl: "views/manage/forum-edit.html",
                title: "Edit forum"
            })
            .when("/manage/user", {
                controller: "User",
                templateUrl: "views/manage/user.html",
                title: "Edit user"
            })
            .when("/:forumSlug/", {
                controller: "Forum",
                templateUrl: "views/forum.html",
                title: "Home"
            })
            .otherwise({
                templateUrl: "views/error.html"
            });*/

        $locationProvider.html5Mode(true);
    }
]);
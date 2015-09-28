"use strict";

var angular = require("angular");

angular.module("teoti.config").config([
    "$locationProvider", "$stateProvider",
    function ($locationProvider, $stateProvider) {
        $stateProvider
            .state("signIn", {
                url: "/sign-in",
                templateUrl: "views/sign-in.html",
                controller: "SignIn",
                data: { title: "Sign In" }
            })
            .state("manage", {
                url: "/manage",
                templateUrl: "views/manage/index.html",
                data: { title: "Admin System" }
            })
            .state("manageGroups", {
                url: "/manage/groups",
                controller: "Groups",
                templateUrl: "views/manage/groups.html",
                data: { title: "Groups" }
            })
            .state("manageGroupCreate", {
                url: "/manage/group",
                controller: "GroupEdit",
                templateUrl: "views/manage/group-edit.html",
                data: { title: "Create group" }
            })
            .state("manageGroupEdit", {
                url: "/manage/group/:groupId",
                controller: "GroupEdit",
                templateUrl: "views/manage/group-edit.html",
                data: { title: "Edit group" }
            })
            .state("manageForums", {
                url: "/manage/forums?parent",
                controller: "Forums",
                templateUrl: "views/manage/forums.html",
                data: { title: "Forums" },
                params: {
                    parent: { value: "-1", squash: true }
                }
            })
            .state("manageForum", {
                url: "/manage/forum",
                controller: "ForumEdit",
                templateUrl: "views/manage/forum-edit.html",
                data: { title: "Create Forum" }
            })
            .state("manageForumItem", {
                url: "/manage/forum/:forumId",
                controller: "ForumEdit",
                templateUrl: "views/manage/forum-edit.html",
                data: { title: "Edit forum" }
            })
            .state("manageUser", {
                url: "/manage/user",
                controller: "User",
                templateUrl: "views/manage/user.html",
                data: { title: "Edit user" }
            })
            .state("forum", {
                url: "/?page",
                controller: "Forum",
                templateUrl: "views/forum.html",
                params: {
                    page: { value: "1", squash: true }
                }
            })
            .state("forumChildren", {
                url: "/:forumSlug/?page",
                controller: "Forum",
                templateUrl: "views/forum.html",
                params: {
                    page: { value: "1", squash: true },
                    forumSlug: { value: null }
                }
            })
            .state("otherwise", {
                url: "*path",
                templateUrl: "views/error.html"
            });

        $locationProvider.html5Mode(true);
    }
]);
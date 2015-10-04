"use strict";

var angular = require("angular");

angular.module("teoti.manager").config([
    "$stateProvider",
    function ($stateProvider) {
        $stateProvider
            .state("manageForums", {
                url: "/manage/forums?parent",
                controller: "Forums",
                templateUrl: require("../views/forums.html"),
                data: { title: "Forums" },
                params: {
                    parent: { value: "-1", squash: true }
                }
            })
            .state("manageForum", {
                url: "/manage/forum",
                controller: "ForumEdit",
                templateUrl: require("../views/forum-edit.html"),
                data: { title: "Create Forum" }
            })
            .state("manageForumItem", {
                url: "/manage/forum/:forumId",
                controller: "ForumEdit",
                templateUrl: require("../views/forum-edit.html"),
                data: { title: "Edit forum" }
            });
    }
]);
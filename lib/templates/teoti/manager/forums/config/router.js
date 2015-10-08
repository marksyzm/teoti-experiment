"use strict";

var angular = require("angular");
var manageForumsTemplateUrl = require("../views/forums.html");
var manageForumTemplateUrl = require("../views/forum-edit.html");
var manageForumEditTemplateUrl = require("../views/forum-edit.html");

angular.module("teoti.manager").config([
    "$stateProvider",
    function ($stateProvider) {
        $stateProvider
            .state("manageForums", {
                url: "/manage/forums?parent",
                controller: "Forums",
                templateUrl: manageForumsTemplateUrl,
                data: { title: "Forums" },
                params: {
                    parent: { value: "-1", squash: true }
                }
            })
            .state("manageForum", {
                url: "/manage/forum",
                controller: "ForumEdit",
                templateUrl: manageForumTemplateUrl,
                data: { title: "Create Forum" }
            })
            .state("manageForumItem", {
                url: "/manage/forum/:forumId",
                controller: "ForumEdit",
                templateUrl: manageForumEditTemplateUrl,
                data: { title: "Edit forum" }
            });
    }
]);
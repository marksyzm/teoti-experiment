"use strict";

var angular = require("angular");
var forumTemplateUrl = require("../views/forum.html");
var forumChildrenTemplateUrl = require("../views/forum.html");

angular.module("teoti.forum").config([
    "$stateProvider",
    function ($stateProvider) {
        $stateProvider
            .state("forum", {
                url: "/?page",
                controller: "Forum",
                templateUrl: forumTemplateUrl,
                params: {
                    page: { value: "1", squash: true }
                }
            })
            .state("forumChildren", {
                url: "/:forumSlug/?page",
                controller: "Forum",
                templateUrl: forumChildrenTemplateUrl,
                params: {
                    page: { value: "1", squash: true },
                    forumSlug: { value: null }
                }
            });
    }
]);
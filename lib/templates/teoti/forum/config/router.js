"use strict";

var angular = require("angular");

angular.module("teoti.forum").config([
    "$stateProvider",
    function ($stateProvider) {
        $stateProvider
            .state("forum", {
                url: "/?page",
                controller: "Forum",
                templateUrl: require("../views/forum.html"),
                params: {
                    page: { value: "1", squash: true }
                }
            })
            .state("forumChildren", {
                url: "/:forumSlug/?page",
                controller: "Forum",
                templateUrl: require("../views/forum.html"),
                params: {
                    page: { value: "1", squash: true },
                    forumSlug: { value: null }
                }
            });
    }
]);
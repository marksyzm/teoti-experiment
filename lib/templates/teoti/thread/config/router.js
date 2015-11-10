"use strict";

var angular = require("angular");
var threadTemplateUrl = require("../views/thread.html");

angular.module("teoti.thread").config([
    "$stateProvider",
    function ($stateProvider) {
        $stateProvider
            .state("thread", {
                url: "/:forumSlug/{threadId:\\\d+}-{threadSlug:[\\\d\\\w-]+}.html?page",
                controller: "Thread",
                templateUrl: threadTemplateUrl,
                params: {
                    page: { value: "1", squash: true },
                    forumSlug: { value: null },
                    threadUrl: { value: null }
                }
            });
    }
]);
"use strict";

var angular = require("angular");
var postTemplateUrl = require("../views/post.html");

angular.module("teoti.post").directive("tPost", [
    "PostResource",
    function (PostResource) {
        function linker (scope) {
            scope.postResource = PostResource;
        }

        return {
            link: linker,
            restrict: "A",
            templateUrl: postTemplateUrl,
            scope: {
                post: "=?tPost",
                temp: "=?tPostTemp",
                edit: "=?tPostEdit",
                reply: "=?tPostReply",
                "delete": "=?tPostDelete",
                report: "=?tPostReport",
            }
        }
    }
]);
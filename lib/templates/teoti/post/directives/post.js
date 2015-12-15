"use strict";

var angular = require("angular");
var postTemplateUrl = require("../views/post.html");

angular.module("teoti.post").directive("tPost", [
    function () {
        return {
            restrict: "A",
            templateUrl: postTemplateUrl,
            scope: {
                post: "=?tPost",
                temp: "=?tPostTemp",
                edit: "=?tPostEdit",
                reply: "=?tPostReply",
                "delete": "=?tPostDelete",
                report: "=?tPostReport"
            }
        }
    }
]);
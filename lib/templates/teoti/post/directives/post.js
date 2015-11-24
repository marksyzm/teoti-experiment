"use strict";

var angular = require("angular");
var postTemplateUrl = require("../views/post.html");

angular.module("teoti.post").directive("post", [
    function () {
        return {
            restrict: "A",
            templateUrl: postTemplateUrl,
            scope: {
                post: "=?"
            }
        }
    }
]);
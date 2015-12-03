"use strict";

var angular = require("angular");
var _ = require("lodash");
var postsTemplateUrl = require("../views/posts.html");

angular.module("teoti.posts").directive("posts", [
    "PostResource",
    function (PostResource) {
        function linker (scope) {
            if (!scope.page) scope.page = 1;

            scope.posts = null;
            scope.error = null;
            scope.loading = scope.hasOwnProperty("loading") ? scope.loading : false;

            function fetch() {
                if (!scope.firstPostId) { scope.loading = false; }
                if (!scope.loading) { return; }
                var params = _.pick(scope, "firstPostId", "page", "limit", "sort");

                PostResource.query(scope.forumSlug, scope.threadId, params)
                    .then(function (response) {
                        scope.loading = false;
                        scope.posts = response.data;
                    }, function (reason) {
                        scope.loading = false;
                        scope.error = reason.data;
                    });
            }

            function init () {
                scope.$watch("loading", function (newItem, oldItem) {
                    if (newItem === oldItem) return;
                    fetch();
                });
                scope.$watch("page", function (newItem, oldItem) {
                    if (newItem === oldItem) {
                        scope.loading = false;
                        return;
                    }
                    scope.loading = true;
                });
                scope.$watch("firstPostId", function (firstPostId) {
                    if (!firstPostId) {
                        scope.loading = false;
                        return;
                    }
                    scope.loading = true;
                });
            }

            init();
        }

        return {
            link: linker,
            templateUrl: postsTemplateUrl,
            restrict: "A",
            scope: {
                firstPostId: '=',
                forumSlug: '=',
                threadId: '=',
                page: '=?',
                sort: '=?',
                limit: '=?',
                loading: '=?'
            }
        };
    }
]);
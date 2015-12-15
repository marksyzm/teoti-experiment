"use strict";

var angular = require("angular");
var _ = require("lodash");
var postsTemplateUrl = require("../views/posts.html");

angular.module("teoti.posts").directive("posts", [
    "PostResource", "Events",
    function (PostResource, Events) {
        function linker (scope) {
            scope.loading = scope.hasOwnProperty("loading") ? scope.loading : false
            scope.newPosts = [];

            function fetch() {
                if (!scope.firstPostId) { scope.loading = false; }
                if (!scope.loading) { return; }
                var params = _.pick(scope, "firstPostId", "page", "limit", "sort");

                PostResource.query(scope.forumSlug, scope.threadId, params)
                    .then(function (response) {
                        scope.loading = false;
                        scope.posts = response.data;

                        var i = scope.newPosts.length;
                        while (i--) {
                            var newPost = scope.newPosts[i];
                            if (newPost && newPost.postEdited) {
                                scope.newPosts.splice(i, 1);
                            }
                        }
                    }, function (reason) {
                        scope.loading = false;
                        scope.error = reason.data;
                    });
            }

            function refresh () {
                scope.loading = true;
            }

            function setEdit (post) {
                scope.editedPost = post;
            }

            function setReply (postReply) {
                scope.reply = postReply;
            }

            function init () {
                scope.setReply = setReply;
                scope.setEdit = setEdit;

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

                scope.$watchCollection("editedPost", function (editedPost) {
                    if (!scope.postEdited && editedPost && !editedPost._id) {
                        if (!scope.newPosts.length) {
                            scope.newPosts.length++;
                        }
                        scope.newPosts[scope.newPosts.length - 1] = editedPost;
                    }
                });

                scope.$watch("postEdited", function (postEdited) {
                    if (postEdited) {
                        scope.newPosts[scope.newPosts.length - 1].postEdited = true;
                        if (!scope.editedPost._id) {
                            scope.newPosts.length++;
                        }
                        scope.page = null;
                        scope.postEdited = false;
                    }
                });

                scope.$on(Events.WINDOW_FOCUS, refresh);
            }

            init();
        }

        return {
            link: linker,
            templateUrl: postsTemplateUrl,
            restrict: "A",
            scope: {
                firstPostId: "=",
                forumSlug: "=",
                threadId: "=",
                post: "=?",
                reply: "=?",
                page: "=?",
                sort: "=?",
                limit: "=?",
                loading: "=?"
            }
        };
    }
]);
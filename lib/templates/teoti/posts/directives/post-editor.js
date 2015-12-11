"use strict";

var angular = require("angular");
var postEditorTemplateUrl = require("../views/post-editor.html");

angular.module("teoti.posts").directive("tPostEditor", [
    "PostResource", "AccountResource",
    function (PostResource, AccountResource) {
        function linker (scope) {
            function fetchPost () {
                PostResource
                    .get(scope.forumSlug, scope.threadId, scope.post._id)
                    .then(function (response) {
                        scope.post = response.data;
                        scope.reply = scope.post.reply;
                    });
            }

            function toggleReplyActive (active) {
                scope.active = active;
            }

            function submit () {
                scope.loading = true;
                PostResource.save()
                    .then(function () {
                        scope.loading = false;
                        scope.edited = true;
                        scope.post = getPostObject();
                    });
            }

            function getPostObject () {
                return { user: AccountResource.account };
            }

            function cancel () {
                toggleReplyActive(false);
                scope.post = getPostObject();
                scope.reply = null;
            }

            function init () {
                scope.fetchPost = fetchPost;
                scope.toggleReplyActive = toggleReplyActive;
                scope.submit = submit;
                scope.cancel = cancel;

                scope.active = false;
                scope.post = getPostObject();

                scope.$watch("post", function (post) {
                    if (post && post._id) fetchPost();
                });

                scope.$watch("reply", function (reply) {
                    if (!reply) return;
                    if (!scope.post) scope.post = {};
                    scope.post.reply = reply._id;
                    scope.active = true;
                });
            }

            init();
        }

        return {
            link: linker,
            templateUrl: postEditorTemplateUrl,
            restrict: "EA",
            scope: {
                post: "=tPostEditorPost",
                postId: "=?tPostEditorPostId",
                loading: "=?tPostEditorLoading",
                edited: "=?tPostEditorEdited",
                reply: "=?tPostEditorReply",
                forumSlug: "=?tPostEditorForumSlug",
                threadId: "=?tPostEditorThreadId"
            }
        };
    }
]);
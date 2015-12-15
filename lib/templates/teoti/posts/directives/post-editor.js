"use strict";

var angular = require("angular");
var postEditorTemplateUrl = require("../views/post-editor.html");

angular.module("teoti.posts").directive("tPostEditor", [
    "PostResource", "AccountResource",
    function (PostResource, AccountResource) {
        function linker (scope, element) {
            var textarea;

            function fetchPost () {
                PostResource
                    .get(scope.forumSlug, scope.threadId, scope.post._id)
                    .then(function (response) {
                        angular.extend(scope.post, response.data);
                        scope.reply = scope.post.reply;
                        scope.active = true;
                        textarea[0].focus();
                    });
            }

            function cancelSubmit () {
                scope.loading = false;
            }

            function submit () {
                scope.loading = true;
                if (scope.post._id) {

                } else {
                    PostResource.save(scope.forumSlug, scope.threadId, scope.post)
                        .then(function () {
                            scope.loading = false;
                            scope.edited = true;
                            cancel();
                        }, cancelSubmit);
                }
            }

            function getPostObject () {
                return { user: AccountResource.account };
            }

            function cancel () {
                scope.active = false;
                scope.reply = false;
                scope.post = getPostObject();
            }

            function init () {
                textarea = element.find("textarea");

                scope.fetchPost = fetchPost;
                scope.submit = submit;
                scope.cancel = cancel;

                scope.active = false;
                scope.post = getPostObject();

                scope.$watch("post", function (post, oldPost) {
                    if (post && post._id && oldPost._id !== post._id) {
                        fetchPost();
                    }
                });

                scope.$watch("reply", function (reply) {
                    if (!reply) return;
                    scope.post = getPostObject();
                    scope.post.reply = reply._id;
                    scope.active = true;
                    textarea[0].focus();
                });

                textarea.on("focus", function () {
                    scope.active = true;
                })
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
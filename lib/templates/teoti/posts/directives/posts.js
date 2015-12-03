"use strict";

var angular = require("angular");
var _ = require("lodash");
var postsTemplateUrl = require("../views/posts.html");

angular.module("teoti.posts").directive("posts", [
    "PostResource", "$stateParams",
    function (PostResource, $stateParams) {
        function linker (scope) {
            if (!scope.page) scope.page = 1;

            scope.posts = null;
            scope.error = null;
            scope.loading = scope.hasOwnProperty('loading') ? scope.loading : false;

            function fetch() {
                if (!scope.loading) return;
                var params = _.pick(scope, "firstPostId", "page", "limit", "sort");

                PostResource.query($stateParams.forumSlug, $stateParams.threadId, params)
                    .then(function (response) {
                        scope.loading = false;
                        scope.posts = response.data;
                    }, function (reason) {
                        scope.loading = false;
                        scope.error = reason.data;
                    });
            }

            function init () {
                scope.$watch("loading", fetch, true);
                scope.$watch("page", function () { scope.loading = true; });
            }

            init();
        }

        return {
            link: linker,
            templateUrl: postsTemplateUrl,
            restrict: "A",
            scope: {
                firstPostId: '=',
                page: '=?',
                sort: '=?',
                limit: '=?',
                loading: '=?'
            }
        };
    }
]);
"use strict";

var angular = require("angular");

angular.module("teoti.scaffolding").factory("PostResource", [
    "$http", "Config",
    function ($http, Config) {
        function getUrl(forumId, threadId, postId) {
            var url = "/api/forum/"+forumId+"/thread/"+threadId+"/post";
            if (postId) { return url + "/" + postId; }
            return url;
        }

        return {
            save: function (forumId, threadId, post) {
                return $http.post(getUrl(forumId, threadId), post);
            },
            "get": function (forumId, threadId, postId) {
                return $http.get(getUrl(forumId, threadId, postId));
            },
            update: function (forumId, threadId, postId, post) {
                return $http.put(getUrl(forumId, threadId, postId), post);
            },
            "delete": function (forumId, threadId, postId) {
                return $http.delete(getUrl(forumId, threadId, postId));
            },
            query: function (forumId, threadId, params) {
                forumId = forumId || Config.defaultForum;
                return $http.get(getUrl(forumId, threadId), { params: params });
            },
            report: function (post, scope) {},
            del: function (post, scope) {}
        };
    }
]);
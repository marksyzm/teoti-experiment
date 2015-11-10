"use strict";

var angular = require("angular");

angular.module("teoti.scaffolding").factory("ThreadsResource", [
    "$http", "Config",
    function ($http, Config) {
        return {
            save: function (forum) {
                return $http.post("/api/forum", forum);
            },
            "get": function (forumId, threadId) {
                return $http.get("/api/forum/"+forumId+"/thread/"+threadId)
                    .then(angular.bind(this, function (response) {
                        this.thread = response.data;
                        return response;
                    }));
            },
            update: function (forumId, threadId, thread) {
                return $http.put("/api/forum/"+forumId+"/thread/"+threadId, thread);
            },
            "delete": function (forumId, threadId) {
                return $http.delete("/api/forum/"+forumId+"/thread/"+threadId);
            },
            query: function (forumSlug, params) {
                return $http.get("/api/forum/"+(forumSlug ? forumSlug : Config.defaultForum)+"/thread", { params: params });
            }
        };
    }
]);
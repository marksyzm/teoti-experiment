"use strict";

var angular = require("angular");

angular.module("teoti.scaffolding").factory("ThreadResource", [
    "$http", "Config",
    function ($http, Config) {
        return {
            save: function (forumId, thread) {
                return $http.post("/api/forum/"+forumId+"/thread", thread);
            },
            "get": function (forumId, threadId) {
                return $http.get("/api/forum/"+forumId+"/thread/"+threadId);
            },
            update: function (forumId, threadId, thread) {
                return $http.put("/api/forum/"+forumId+"/thread/"+threadId, thread);
            },
            "delete": function (forumId, threadId) {
                return $http.delete("/api/forum/"+forumId+"/thread/"+threadId);
            },
            query: function (forumId, params) {
                forumId = forumId || Config.defaultForum;
                return $http.get("/api/forum/"+forumId+"/thread", { params: params });
            }
        };
    }
]);
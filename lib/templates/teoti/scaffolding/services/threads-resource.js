"use strict";

var angular = require("angular");

angular.module("teoti.scaffolding").factory("ThreadsResource", [
    "$http", "Config",
    function ($http, Config) {
        return {
            save: function (forum) {
                return $http.post("/api/forum", forum);
            },
            "get": function (forumId) {
                return $http.get("/api/forum/"+forumId)
                    .then(angular.bind(this, function (response) {
                        this.forum = response.data;
                        return response;
                    }));
            },
            update: function (forumId, forum) {
                return $http.put("/api/forum/"+forumId, forum);
            },
            "delete": function (groupId) {
                return $http.delete("/api/forum/"+groupId);
            },
            query: function (forumSlug, params) {
                return $http.get("/api/forum/"+(forumSlug ? forumSlug : Config.defaultForum)+"/thread", { params: params });
            }
        };
    }
]);
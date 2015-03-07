"use strict";

var angular = require("angular");

var config = require("../../../../config/app.json");

angular.module("teoti.services").factory("ThreadsResource", [
    "$http",
    function ($http) {
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
            query: function (forumSlug) {
                return $http.get("/api/forum/"+(forumSlug ? forumSlug : config.defaultForum)+"/thread", { params: {
                    page: 1
                }});
            }
        };
    }
]);
"use strict";

var angular = require("angular");

angular.module("teoti.scaffolding").factory("ForumResource", [
    "$http",
    function ($http) {
        return {
            forum: null,
            forums: [],
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
            query: function (parent) {
                return $http.get("/api/forum", { params: { parent: parent } });
            },
            getCollection: function (parent) {
                return this.query(parent)
                    .then(angular.bind(this, function (response) {
                        this.forums.length = 0;
                        this.forums.push.apply(this.forums, response.data);
                    }));
            }
        };
    }
]);
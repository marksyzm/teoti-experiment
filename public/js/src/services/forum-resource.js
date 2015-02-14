"use strict";

angular.module("teoti.services").factory("ForumResource", [
    "$http",
    function ($http) {
        return {
            save: function (forum) {
                return $http.post("/api/forum", forum);
            },
            "get": function (forumId) {
                return $http.get("/api/forum/"+forumId);
            },
            update: function (forumId, forum) {
                return $http.put("/api/forum/"+forumId, forum);
            },
            "delete": function (groupId) {
                return $http.delete("/api/forum/"+groupId);
            },
            query: function (parent) {
                return $http.get("/api/forum", { params: { parent: parent } });
            }
        };
    }
]);
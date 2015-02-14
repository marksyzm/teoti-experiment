"use strict";

angular.module("teoti.services").factory("UserResource", [
    "$http",
    function ($http) {
        return {
            save: function (group) {
                return $http.post("/api/user", group);
            },
            "get": function (groupId) {
                return $http.get("/api/user/"+groupId);
            },
            update: function (groupId, group) {
                return $http.put("/api/user/"+groupId, group);
            },
            "delete": function (groupId) {
                return $http.delete("/api/user/"+groupId);
            },
            query: function () {
                return $http.get("/api/user");
            }
        };
    }
]);
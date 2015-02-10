"use strict";

angular.module("teoti.services").factory("GroupResource", [
    "$http",
    function ($http) {
        return {
            save: function (group) {
                return $http.post("/api/group", group);
            },
            "get": function (groupId) {
                return $http.get("/api/group/"+groupId);
            },
            update: function (groupId, group) {
                return $http.put("/api/group/"+groupId, group);
            },
            "delete": function (groupId) {
                return $http.delete("/api/group/"+groupId);
            },
            query: function () {
                return $http.get("/api/group");
            }
        };
    }
]);
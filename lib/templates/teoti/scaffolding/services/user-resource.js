"use strict";

var angular = require("angular");

angular.module("teoti.scaffolding").factory("UserResource", [
    "$http",
    function ($http) {
        return {
            save: function (user) {
                return $http.post("/api/user", user);
            },
            "get": function (userId) {
                return $http.get("/api/user/"+userId);
            },
            update: function (userId, user) {
                return $http.put("/api/user/"+userId, user);
            },
            "delete": function (userId) {
                return $http.delete("/api/user/"+userId);
            },
            query: function (params) {
                return $http.get("/api/user", { params: params });
            }
        };
    }
]);
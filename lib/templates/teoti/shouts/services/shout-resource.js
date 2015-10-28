"use strict";

var angular = require("angular");

angular.module("teoti.shouts").factory("ShoutResource", [
    "$http",
    function ($http) {
        return {
            save: function (shout) {
                return $http.post("/api/shout", shout);
            },
            "get": function (shoutId) {
                return $http.get("/api/shout/"+shoutId);
            },
            update: function (shout) {
                return $http.put("/api/shout/"+shout._id, shout);
            },
            "delete": function (shoutId) {
                return $http.delete("/api/shout/"+shoutId);
            },
            query: function () {
                return $http.get("/api/shout");
            }
        };
    }
]);
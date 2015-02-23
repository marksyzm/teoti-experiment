"use strict";

angular.module("teoti.services").factory("AccountResource", [
    "$http",
    function ($http) {
        return {
            "get": function () {
                var account = this;
                return $http.get("/api/account").then(function (response) {
                    angular.extend(account, response.data);
                });
            },
            update: function () {
                return $http.put("/api/account", this);
            }
        };
    }
]);
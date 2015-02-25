"use strict";

angular.module("teoti.services").factory("AccountResource", [
    "$http",
    function ($http) {
        return {
            account: {},
            "get": function () {
                return $http.get("/api/account")
                    .then(angular.bind(this, function (response) {
                        angular.extend(this.account, response.data);
                    }));
            },
            update: function () {
                return $http.put("/api/account", this);
            }
        };
    }
]);
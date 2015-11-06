"use strict";

var angular = require("angular");

angular.module("teoti.scaffolding").factory("AccountResource", [
    "$http", "$q",
    function ($http) {
        return {
            account: {
                settings: {}
            },
            "get": function () {
                return $http.get("/api/account")
                    .then(angular.bind(this, function (response) {
                        angular.extend(this.account, response.data);
                    }));
            },
            update: function () {
                return $http.put("/api/account", this.account);
            }
        };
    }
]);
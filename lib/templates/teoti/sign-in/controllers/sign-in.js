"use strict";

var angular = require("angular");

angular.module("teoti.sign-in").controller("SignIn", [
    "$scope", "$http", "$window",
    function ($scope, $http, $window) {
        $scope.user = {};
        $scope.message = "";
        $scope.submit = function ($event) {
            $scope.message = "";
            $event.preventDefault();
            $http.post("/sign-in", $scope.user)
                .then(function (response) {
                    var message = response.headers("error-message");
                    if (message) {
                        $scope.message = message;
                    } else {
                        $window.location.href = "/";
                    }
                });
        };
    }
]);
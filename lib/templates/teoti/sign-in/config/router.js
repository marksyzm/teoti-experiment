"use strict";

var angular = require("angular");

angular.module("teoti.sign-in").config([
    "$stateProvider",
    function ($stateProvider) {
        $stateProvider
            .state("signIn", {
                url: "/sign-in",
                templateUrl: require("../views/sign-in.html"),
                controller: "SignIn",
                data: { title: "Sign In" }
            });
    }
]);
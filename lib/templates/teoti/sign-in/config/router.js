"use strict";

var angular = require("angular");
var signInTemplateUrl = require("../views/sign-in.html");

angular.module("teoti.sign-in").config([
    "$stateProvider",
    function ($stateProvider) {
        $stateProvider
            .state("signIn", {
                url: "/sign-in",
                templateUrl: signInTemplateUrl,
                controller: "SignIn",
                data: { title: "Sign In" }
            });
    }
]);
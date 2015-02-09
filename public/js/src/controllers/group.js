"use strict";

var angular = require("angular"),
    settings = require("../../../../config/app.json");

angular.module("teoti.controllers").controller("Group", [
    function () {
        console.log(settings);
    }
]);
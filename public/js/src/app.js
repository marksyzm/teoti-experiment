"use strict";

var angular = require("angular");
console.log(require("angular-route"));

var modules = [
    "ngRoute",
    require("./modules/teoti.modules")
];

angular.module("teoti", modules);

angular.bootstrap(document, ["teoti"]);

module.exports = angular;
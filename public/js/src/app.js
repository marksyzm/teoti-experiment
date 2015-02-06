"use strict";

var angular = require("angular");

var modules = [
    require("angular-ui-router"),
    require("./modules/teoti.modules")
];

angular.module("teoti", modules);

angular.bootstrap(document, ["teoti"]);

module.exports = angular;
"use strict";

var $ = require("jquery");
var angular = require("angular");

var modules = [
    require("angular-ui-router"),
    require('angular-ui-bootstrap'),
    require("./modules/teoti.modules.js")
];

angular.module("teoti", modules);

module.exports = angular;
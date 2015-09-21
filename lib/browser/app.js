"use strict";

var $ = require("jquery");
var angular = require("angular");
require("angular-deckgrid");

var modules = [
    require("angular-ui-router"),
    require("angular-ui-bootstrap"),
    "akoenig.deckgrid",
    require("./modules/teoti.modules.js")
];

angular.module("teoti", modules);

module.exports = angular;
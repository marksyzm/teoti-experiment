"use strict";

var $ = require("jquery");

var angular = require("angular");
require("angular-route");


var modules = [
    "ngRoute",
    require("./modules/teoti.modules.js")
];

//empty main contents so they don't get passed around and reloaded in angular route
var el = document.querySelector("main");
while (el.firstChild) { el.removeChild(el.firstChild); }

angular.module("teoti", modules);

module.exports = angular;
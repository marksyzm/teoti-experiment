'use strict';

var angular = require('angular');
require("angular-scroll");
require("angularjs-scroll-glue")

module.exports = angular.module('teoti.shouts', [
    "duScroll",
    "luegg.directives"
]).name;

require("./directives/shout");
require("./directives/shouts");

require("./services/shout-resource");
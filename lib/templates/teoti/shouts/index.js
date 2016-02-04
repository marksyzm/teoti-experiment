'use strict';

var angular = require('angular');
require("angular-scroll");
require("angularjs-scroll-glue");
require("../linkify");

module.exports = angular.module('teoti.shouts', [
    "duScroll",
    "luegg.directives",
    require("angular-ui-bootstrap"),
    "linkify",
    require("angular-moment").name
]).name;

require("./directives/shout");
require("./directives/shouts");

require("./services/shout-resource");
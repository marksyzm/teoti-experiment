'use strict';

var angular = require('angular');
require("angular-scroll");
require("angularjs-scroll-glue");
require("angular-linkify");

module.exports = angular.module('teoti.shouts', [
    "duScroll",
    "luegg.directives",
    require('angular-ui-bootstrap'),
    "linkify"
]).name;

require("./directives/shout");
require("./directives/shouts");

require("./services/shout-resource");
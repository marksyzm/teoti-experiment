'use strict';

var angular = require('angular');
require("angular-deckgrid");

module.exports = angular.module('teoti.threads', [
    "akoenig.deckgrid"
]).name;

require('./directives/threads');
require('./directives/thread');
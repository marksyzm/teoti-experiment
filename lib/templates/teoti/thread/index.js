'use strict';

var angular = require('angular');
require("angular-deckgrid");
require("angular-bind-html-compile");

module.exports = angular.module('teoti.thread', [
    "angular-bind-html-compile"
]).name;

require('./config/router');

require('./controllers/thread');

require('./directives/thread');
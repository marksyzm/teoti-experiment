'use strict';

var angular = require('angular');
require("angular-deckgrid");

module.exports = angular.module('teoti.thread', [
    require("angular-bind-html-compile"),
    require("angular-moment").name
]).name;

require('./config/router');

require('./controllers/thread');

require('./directives/thread');
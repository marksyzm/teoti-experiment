'use strict';

var angular = require('angular');
require("angular-deckgrid");

module.exports = angular.module('teoti.thread', []).name;

require('./config/router');

require('./controllers/thread');

require('./directives/thread');
'use strict';

var angular = require('angular');

module.exports = angular.module('teoti.threads', []).name;

require('./directives/threads');
require('./directives/thread');
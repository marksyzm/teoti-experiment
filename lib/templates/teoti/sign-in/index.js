'use strict';

var angular = require('angular');

module.exports = angular.module('teoti.sign-in', []).name;

require('./config/router');

require('./controllers/sign-in');
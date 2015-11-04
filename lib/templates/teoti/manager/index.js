'use strict';

var angular = require('angular');

module.exports = angular.module('teoti.manager', [
    require('angular-ui-bootstrap')
]).name;

require('./config/router');

require('./forums');
require('./groups');
require('./users');
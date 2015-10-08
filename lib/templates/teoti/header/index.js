'use strict';

var angular = require('angular');

module.exports = angular.module('teoti.header', [
    require('angular-ui-bootstrap')
]).name;

require('./views/page-header.html');

require('./controllers/header');

require('./navigation-menu');
require('./account-menu');
require('./search');
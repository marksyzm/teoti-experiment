'use strict';

var angular = require('angular');

module.exports = angular.module('teoti.header', [
    require('angular-ui-bootstrap')
]).name;

require('./sass/index.scss');

require('./controllers/header');

require('./navigation-menu');
require('./account-menu');
require('./search');
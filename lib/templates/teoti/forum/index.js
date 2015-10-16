'use strict';

var angular = require('angular');

module.exports = angular.module('teoti.forum', [
    require('angular-ui-router')
]).name;

require('./sass/index.scss');

require('./config/router');
require('./controllers/forum');
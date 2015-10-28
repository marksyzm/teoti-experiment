'use strict';

var angular = require('angular');

var modules = [
    require('angular-ui-router'),
    require('angular-ui-bootstrap')
];

module.exports = angular.module('teoti.scaffolding', modules).name;

require('./sass/index.scss');

require('./config/router');
require('./run/init');

var requires = require.context('./filters', true, /.*/);
requires.keys().forEach(requires);
requires = require.context('./constants', true, /.*/);
requires.keys().forEach(requires);
requires = require.context('./directives', true, /.*/);
requires.keys().forEach(requires);
requires = require.context('./services', true, /.*/);
requires.keys().forEach(requires);

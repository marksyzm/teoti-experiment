'use strict';

require('jquery');
var angular = require('angular');

var modules = [
    require('angular-ui-router'),
    require('angular-ui-bootstrap')
];

module.exports = angular.module('teoti.scaffolding', modules).name;

//require('./sass/index.scss');

require('./config/router');

var requires = require.context('./constants', true, /.*/);
requires.keys().forEach(requires);
var requires = require.context('./directives', true, /.*/);
requires.keys().forEach(requires);
var requires = require.context('./services', true, /.*/);
requires.keys().forEach(requires);

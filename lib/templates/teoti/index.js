'use strict';

var angular = require('angular');

angular.module('teoti', [
    require('./scaffolding'),
    require('./forum'),
    require('./header'),
    require('./like-dislike'),
    require('./manager'),
    require('./media'),
    require('./shouts'),
    require('./sign-in'),
    require('./threads'),
    require('./thread'),
    require('./users'),
    require('./bbcode'),
    require('./posts')
]);

module.exports = angular;
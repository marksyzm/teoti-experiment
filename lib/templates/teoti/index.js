'use strict';

var angular = require('angular');

angular.module('teoti', [
    require('./scaffolding'),
    require('./forum'),
    require('./header'),
    require('./like-dislike'),
    require('./manager'),
    require('./media'),
    require('./shout'),
    require('./sign-in'),
]);

module.exports = angular;
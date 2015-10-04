'use strict';

var angular = require('angular');

angular.module('teoti.scaffolding').config([
    '$locationProvider', '$stateProvider',
    function ($locationProvider, $stateProvider) {
        $stateProvider
            .state('otherwise', {
                url: '*path',
                templateUrl: require('../views/error.html')
            });

        $locationProvider.html5Mode(true);
    }
]);
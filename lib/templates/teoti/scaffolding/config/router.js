'use strict';

var angular = require('angular');
var otherwiseTemplateUrl = require('../views/error.html');

angular.module('teoti.scaffolding').config([
    '$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('error404', {
                url: '/404',
                templateUrl: otherwiseTemplateUrl
            });

        $locationProvider.html5Mode(true);
    }
]);
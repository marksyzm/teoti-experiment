"use strict";

var angular = require("angular");
var searchTemplateUrl = require("../views/search.html");

angular.module("teoti.header").directive("search", [
    function () {
        function link (scope) {
            scope.searchActive = false;
            scope.form = null;

            scope.setForm = function (form) {
                scope.form = form;
            };

            scope.submit = function () {
                scope.searchActive = !scope.searchActive;
            };
        }
        
        return {
            link: link,
            restrict: 'A',
            templateUrl: searchTemplateUrl,
            scope: {}
        };
    }
]);
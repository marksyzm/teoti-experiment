"use strict";

var angular = require("angular");
var templates = require.context('../views/users/', false, /\.html$/);
templates.keys().forEach(function(key) { templates(key); })

angular.module("teoti.users").directive("users", [
    'UserResource',
    function (UserResource) {
        function linker (scope, element, attrs) {
            scope.page = scope.page || 1;
            scope.users = null;
            scope.error = null;
            scope.view = attrs.view;
            scope.showPaginate = scope.hasOwnProperty('showPaginate') ? scope.showPaginate : true;

            function fetchUsers() {
                if (!scope.loading) { return; }
                var params = { page: scope.page };

                ['sort', 'limit'].forEach(function (key) {
                    if (scope[key] !== void 0) { params[key] = scope[key]; }
                });

                UserResource.query(params)
                    .then(function (response) {
                        scope.loading = false;
                        scope.users = response.data.users;
                    }, function (reason) {
                        scope.loading = false;
                        scope.error = reason.data;
                    });
            }

            function init () {
                scope.$watch("loading", fetchUsers);
                scope.$watchGroup([ "page" ], function () {
                    scope.loading = true;
                });
            }

            init();
        }

        return {
            link: linker,
            templateUrl: function (el, attrs) {
                if (attrs.view) return require('../views/users/'+attrs.view+'.html');
                return require('../views/users/compact.html');
            },
            restrict: "A",
            scope: {
                view: '=',
                page: '=?',
                sort: '=?',
                loading: '=?',
                limit: '=?'
            }
        };
    }
]);
"use strict";

var angular = require("angular");

angular.module("teoti.directives").directive("users", [
    'UserResource',
    function (UserResource) {
        function linker (scope, element, attrs) {
            scope.page = scope.page || 1;
            scope.users = null;
            scope.error = null;
            scope.view = attrs.view;

            function fetchUsers() {
                var params = { page: scope.page };

                ['random', 'sort', 'limit', 'dateLimit', 'sticky'].forEach(function (key) {
                    if (scope[key] !== void 0) { params[key] = scope[key]; }
                });

                UserResource.query(scope.forumSlug, params)
                    .then(function (response) {
                        scope.users = response.data.users;
                    }, function (reason) {
                        scope.error = reason.data;
                    });
            }

            function init () {
                fetchUsers();
            }

            init();
        }

        return {
            link: linker,
            templateUrl: function (el, attrs) {
                if (attrs.view) { return 'views/directives/users/'+attrs.view+'.html'; }
                return 'views/directives/users/compact.html';
            },
            restrict: "A",
            scope: {
                view: '=',
                page: '=?',
                sort: '=?',
                limit: '=?'
            }
        };
    }
]);
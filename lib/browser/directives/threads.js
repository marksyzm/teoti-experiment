"use strict";

var angular = require("angular");
var lodash = require("lodash");

angular.module("teoti.directives").directive("threads", [
    'ThreadsResource',
    function (ThreadsResource) {
        function linker (scope, element, attrs) {
            scope.page = scope.page || 1;
            scope.forum = null;
            scope.threads = null;
            scope.error = null;
            scope.view = attrs.view;

            function fetchThreads() {
                var params = { page: scope.page };

                ['random', 'sort', 'limit', 'dateLimit'].forEach(function (key) {
                    if (scope[key] !== void 0) { params[key] = scope[key]; }
                });

                ThreadsResource.query(scope.forumSlug, params)
                    .then(function (response) {
                        scope.forum = response.data.forum;
                        scope.threads = response.data.threads;
                    }, function (reason) {
                        scope.error = reason.data;
                    });
            }

            function init () {
                fetchThreads();
            }

            init();
        }

        return {
            link: linker,
            templateUrl: function (el, attrs) {
                if (attrs.view) { return 'views/directives/threads/'+attrs.view+'.html'; }
                return 'views/directives/threads/simple.html';
            },
            restrict: "A",
            scope: {
                view: '=',
                forumSlug: '=?',
                page: '=?',
                random: '=?',
                sort: '=?',
                limit: '=?',
                dateLimit: '=?'
            }
        };
    }
]);
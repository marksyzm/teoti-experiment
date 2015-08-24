"use strict";

var angular = require("angular");

angular.module("teoti.directives").directive("threads", [
    'ThreadsResource',
    function (ThreadsResource) {
        function linker (scope, element, attrs) {
            if (!scope.page) scope.page = 1;

            scope.forum = null;
            scope.threads = null;
            scope.error = null;
            scope.view = attrs.view;
            scope.showPaginate = scope.hasOwnProperty('showPaginate') ? scope.showPaginate : true;
            scope.loading = scope.hasOwnProperty('loading') ? scope.loading : false;

            function fetchThreads() {
                if (!scope.loading) { return; }
                var params = { page: scope.page };

                ['random', 'sort', 'limit', 'dateLimit', 'sticky'].forEach(function (key) {
                    if (scope[key] !== void 0) { params[key] = scope[key]; }
                });

                ThreadsResource.query(scope.forumSlug, params)
                    .then(function (response) {
                        scope.loading = false;
                        scope.forum = response.data.forum;
                        scope.threads = response.data.threads;
                    }, function (reason) {
                        scope.loading = false;
                        scope.error = reason.data;
                    });
            }

            function init () {
                scope.$watch("loading", fetchThreads, true);
                scope.$watchGroup(["page","dateLimit"], function () {
                    scope.loading = true;
                });
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
                sticky: '=?',
                dateLimit: '=?',
                loading: '=?',
                showPaginate: '=?'
            }
        };
    }
]);
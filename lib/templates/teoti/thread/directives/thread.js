"use strict";

var angular = require("angular");
var templates = require.context('../views/thread/', false, /\.html$/);
templates.keys().forEach(function(key) { templates(key); });


angular.module("teoti.thread").directive("thread", [
    "ThreadResource",
    function (ThreadResource) {
        function link (scope) {
            if (scope.threadId) {
                ThreadResource.get(scope.forumSlug, Number(scope.threadId))
                    .then(function (response) {
                        scope.thread = response.data;
                    });
            }
        }

        return {
            link: link,
            templateUrl: function (el, attrs) {
                if (attrs.view) return require('../views/thread/'+attrs.view+'.html');
                return require('../views/thread/simple.html');
            },
            restrict: "A",
            scope: {
                thread: "=?",
                page: "=?",
                threadId: "=?",
                forumSlug: "=?"
            }
        };
    }
]);
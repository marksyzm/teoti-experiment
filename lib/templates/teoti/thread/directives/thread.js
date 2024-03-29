"use strict";

var angular = require("angular");
var templates = require.context('../views/thread/', false, /\.html$/);
templates.keys().forEach(function(key) { templates(key); });


angular.module("teoti.thread").directive("thread", [
    "ThreadsResource",
    function (ThreadsResource) {
        function link ($scope) {
            if ($scope.threadId) {
                ThreadsResource.get($scope.forumSlug, Number($scope.threadId))
                    .then(function (response) {
                        $scope.thread = response.data;
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
                thread: "=",
                threadId: "=?",
                forumSlug: "=?"
            }
        };
    }
]);
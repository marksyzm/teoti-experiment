"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("Forum", [
    "$scope", "$rootScope", "$location", "$route", "ThreadsResource",
    function ($scope, $rootScope, $location, $route, ThreadsResource) {
        $scope.forum = null;
        $scope.threads = null;

        var forumSlug = $route.current.params.forumSlug;
        var page = $location.search().page;

        $scope.getThreadUrl = function (thread) {
            return "/" + thread.forum.forumSlug + "/" + thread._id + "-" + thread.slug + ".html";
        };

        $scope.fetchThreads = function () {
            ThreadsResource.query(forumSlug, page).then(function (response) {
                $scope.forum = response.data.forum;

                $scope.threads = response.data.threads;
            });
        };

        $scope.fetchThreads();
    }
]);
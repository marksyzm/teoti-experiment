"use strict";

var angular = require("angular"),
    _ = require("lodash");

angular.module("teoti.controllers").controller("Forum", [
    "$scope", "$rootScope", "$location", "$route", "ThreadsResource",
    function ($scope, $rootScope, $location, $route, ThreadsResource) {
        $scope.forum = null;
        $scope.threads = null;
        $scope.error = null;

        var forumSlug = $route.current.params.forumSlug;
        var page = $location.search().page;

        $scope.getThreadUrl = function (thread) {
            return "/" + thread.forum.forumSlug + "/" + thread._id + "-" + thread.slug + ".html";
        };

        $scope.fetchForum = function () {
            ThreadsResource.query(forumSlug, page)
                .then(function (response) {
                    $scope.forum = response.data.forum;
                    $scope.threads = response.data.threads;
                }, function (reason) {
                    $scope.error = reason.data;
                });
        };

        $scope.fetchForum();
    }
]);
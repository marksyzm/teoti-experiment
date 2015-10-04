"use strict";

var angular = require("angular");

angular.module("teoti.manager").config([
    "$stateProvider",
    function ($stateProvider) {
        $stateProvider
            .state("manageGroups", {
                url: "/manage/groups",
                controller: "Groups",
                templateUrl: require("../views/groups.html"),
                data: { title: "Groups" }
            })
            .state("manageGroupCreate", {
                url: "/manage/group",
                controller: "GroupEdit",
                templateUrl: require("../views/group-edit.html"),
                data: { title: "Create group" }
            })
            .state("manageGroupEdit", {
                url: "/manage/group/:groupId",
                controller: "GroupEdit",
                templateUrl: require("../views/group-edit.html"),
                data: { title: "Edit group" }
            });
    }
]);
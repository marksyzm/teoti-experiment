"use strict";

var angular = require("angular");
var manageGroupsTemplateUrl = require("../views/groups.html");
var manageGroupTemplateUrl = require("../views/group-edit.html");
var manageGroupEditTemplateUrl = require("../views/group-edit.html");

angular.module("teoti.manager").config([
    "$stateProvider",
    function ($stateProvider) {
        $stateProvider
            .state("manageGroups", {
                url: "/manage/groups",
                controller: "Groups",
                templateUrl: manageGroupsTemplateUrl,
                data: { title: "Groups" }
            })
            .state("manageGroupCreate", {
                url: "/manage/group",
                controller: "GroupEdit",
                templateUrl: manageGroupTemplateUrl,
                data: { title: "Create group" }
            })
            .state("manageGroupEdit", {
                url: "/manage/group/:groupId",
                controller: "GroupEdit",
                templateUrl: manageGroupEditTemplateUrl,
                data: { title: "Edit group" }
            });
    }
]);
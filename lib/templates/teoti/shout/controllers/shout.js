"use strict";

var angular = require("angular");

angular.module("teoti.controllers").controller("Shout", [
    "$scope", "$sce",
    function ($scope, $sce) {
        $scope.form = null;

        $scope.shouts = [
            { user: { username: "marksyzm" }, message: "<p>This is looking good</p>" },
            { user: { username: "griffin" }, message: "<p>Undoubtably - it surely is one of the most fascinating and nad-trembling pieces of work ever to have been accomplished by a mammal in this generation of fools. </p>" },
            { user: { username: "Quaektem" }, message: "<p>I didn’t even know this was here. I blame Bush.</p>" },
            { user: { username: "REALITY" }, message: "<p>In other news, I suddenly realised that I should be coming out of hiding at ANY MOMENT.</p>" }
        ];

        $scope.setForm = function (form) {
            $scope.form = form;
        };

        $scope.trustHtml = function (html) {
            return $sce.trustAsHtml( html );
        };
    }
]);
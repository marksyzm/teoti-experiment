'use strict';

var angular = require("angular")

angular.module("teoti.scaffolding").filter('nl2br', [
    function () {
        return function (text) {
            if (!text) return text;
            text = text.replace(/\n{2,}/g, "<br><br>");
            text = text.replace(/\n/g, "<br>");
            return text;
        };
    }
]);
'use strict';

var angular = require("angular")

angular.module("teoti.scaffolding").filter('nl2br', [
    function () {
        return function (text, limit) {
            if (!text) return text;
            if (limit && limit > 1) {
                text = text.replace(new RegExp("\n{"+limit+",}", "g"), "<br><br>");
            }
            text = text.replace(/\n/g, "<br>");
            return text;
        };
    }
]);
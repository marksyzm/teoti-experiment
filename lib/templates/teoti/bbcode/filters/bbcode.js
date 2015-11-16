"use strict";

var angular = require("angular")

angular.module("teoti.bbcode").filter("bbcode", [
    "BBCodeParser",
    function (BBCodeParser) {
        return function (text) {
            if (!text) return "";
            text = BBCodeParser.parse(text);
            return text;
        };
    }
]);
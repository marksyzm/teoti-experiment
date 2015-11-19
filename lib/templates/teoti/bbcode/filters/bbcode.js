"use strict";

var angular = require("angular")

angular.module("teoti.bbcode").filter("bbcode", [
    "BBCodeParser", "StringUtils",
    function (BBCodeParser, StringUtils) {
        return function (text) {
            if (!text) return "";
            text = StringUtils.xss(text);
            text = StringUtils.nl2br(text);
            text = BBCodeParser.parse(text);
            return text;
        };
    }
]);
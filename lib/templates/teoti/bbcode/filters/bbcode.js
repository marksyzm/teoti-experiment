"use strict";

var angular = require("angular")

angular.module("teoti.bbcode").filter("bbcode", [
    "BBCodeParser", "StringUtils", "linkify",
    function (BBCodeParser, StringUtils, linkify) {
        return function (text) {
            if (!text) return "";
            text = StringUtils.xss(text);
            text = StringUtils.nl2br(text);
            text = BBCodeParser.parse(text);
            text = linkify.parse(text);
            return text;
        };
    }
]);
"use strict";

var angular = require("angular")

angular.module("teoti.bbcode").filter("bbcode", [
    "BBCodeParser", "$sce",
    function (BBCodeParser, $sce) {
        return function (text) {
            text = text || "";
            text = BBCodeParser.parse(text);
            return $sce.trustAsHtml(text);
        };
    }
]);
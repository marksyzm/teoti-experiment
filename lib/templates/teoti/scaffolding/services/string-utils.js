"use strict";

var angular = require("angular");
var xssFilter = require("xss");

angular.module("teoti.scaffolding").factory("StringUtils", [
    '$sce', 'linkify',
    function ($sce, linkify) {
        return {
            nl2br: function (text, limit) {
                if (!text) return text;
                if (limit && limit > 1) {
                    text = text.replace(new RegExp("\n{"+limit+",}", "g"), "<br><br>");
                }
                text = text.replace(/\n/g, "<br>");
                return text;
            },
            trust: function (text) {
                return $sce.trustAsHtml(text);
            },
            xss: function (text) {
                return xssFilter(text, {
                    whiteList:          [],        // empty, means filter out all tags
                    stripIgnoreTagBody: ['script'] // the script tag is a special case, we need to filter out its content
                });
            },
            linkify: function (text, options) {
                return linkify.parse(text, options);
            }
        };
    }
]);
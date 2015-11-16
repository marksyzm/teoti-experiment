"use strict";

var bboxed = require("bboxed");
var bbcodes = require("../data/bbcodes.json");

angular.module("teoti.bbcode").provider("BBCodeParser", [
    function () {
        bboxed.setOption("noDefaultTags", true);

        var tagActions = {
            url: {
                open: function(token) {
                    if (token.arguments.tag) return "<a target=\"_blank\" href=\"" + token.arguments.tag + "\">";
                    return "<a target=\"_blank\" media href=\"";
                },
                close: function(token) {
                    if (token.arguments.tag) return "</a>";
                    return "\">" + token.interior + "</a>";
                }
            }
        };

        bbcodes.forEach(function (bbcode) {
            if (typeof bbcode === "object" && bbcode.alias) bbcode = bbcode.alias;
            if (tagActions[bbcode]) return bboxed.addTag(bbcode, tagActions[bbcode]);
            return bboxed.addTag(bbcode, { open: "<"+bbcode+">", close: "</"+bbcode+">" });
        });

        this.$get = [
            function () {
                return {
                    parse: function (bbcode) {
                        return bboxed(bbcode);
                    }
                };
            }
        ];
    }
]);
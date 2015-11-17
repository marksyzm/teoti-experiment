"use strict";

var bboxed = require("bboxed");
var validator = require("validator");
var bbcodes = require("../data/bbcodes.json");

angular.module("teoti.bbcode").provider("BBCodeParser", [
    function () {
        bboxed.setOption("noDefaultTags", true);

        var tagActions = {
            url: {
                open: function(token) {
                    var argument = token.arguments.tag;

                    if (argument) {
                        try { validator.isURL(argument); }
                        catch (e) { return false; }
                        return "<a target=\"_blank\" href=\"" + argument + "\">";
                    }

                    try { validator.isURL(token.interior); }
                    catch (e) { console.log(e); return false; }
                    return "<a target=\"_blank\" media href=\"";
                },
                close: function(token) {
                    if (token.arguments.tag)  return "</a>";
                    return "\">" + token.interior + "</a>";
                }
            },

            img: {
                open: function (token) {
                    try { validator.isURL(token.interior); }
                    catch (e) { return false; }

                    var args = token.arguments;
                    var width = 0;
                    var height = 0;
                    var alt = "";
                    var out = "<img ";

                    if (args.tag) {
                        if (/^\d+x\d+$/.test(args.tag)) {
                            var parts = args.tag.split("x");
                            width = parts[0];
                            height = parts[1];
                        } else {
                            alt = args.tag;
                        }
                    }

                    if (!isNaN(args.width)) { width = +args.width; }
                    if (!isNaN(args.height)) { height = +args.height; }
                    if (args.alt) { alt = validator.escape(args.alt); }
                    if (alt) { out += "alt=\"" + alt + "\" "; }
                    if (width) { out += "width=\"" + width + "\" "; }
                    if (height) { out += "height=\"" + height + "\" "; }

                    return out + "src=\"";
                },
                close: "\">"
            },

            color: {
                open: function(token) {
                    var argument = token.arguments.tag;
                    if (!argument) return false;
                    return "<span style=\"color: "+validator.escape(argument)+";\">"
                },
                close: "</span>"
            },

            quote: {
                open: "<blockquote>",
                close: function () {
                    var output = "</blockquote>";
                    var argument = token.arguments.tag ? validator.escape(argument) : "";
                    var source = token.arguments.source ? validator.escape(source) : "";
                    if (argument) {
                        output =
                            "<footer>"+argument+
                            (source ? "<cite title=\""+source+"\">"+source+"</cite>" : "")+
                            "</footer>"+output;
                    }
                    return output;
                }
            },

            size: {
                open: function(token, options) {
                    var argument = token.arguments.tag;
                    var size;

                    if (!argument || isNaN(argument)) size = 4;
                    size = Math.min(options.max, Math.max(options.min, +size));
                    return "<span class=\"font-size-"+size.toString(10)+"\">";
                },
                close: "</span>",
                options: {
                    constrainSize: true,
                    min: 1,
                    max: 7
                }
            },

            font: {
                open: function(token, options) {
                    var argument = token.arguments.tag;

                    if (!argument || isNaN(argument)) return false;
                    argument = validator.escape(argument);
                    return "<span class=\"font-family:"+argument+"\">";
                },
                close: "</span>",
                options: {
                    constrainSize: true,
                    min: 1,
                    max: 7
                }
            },

            u: { open: "<span style=\"text-decoration: underline;\">", close: "</span>" },
            left: { open: "<span style=\"text-align: left;\">", close: "</span>" },
            center: { open: "<span style=\"text-align: center;\">", close: "</span>" },
            right: { open: "<span style=\"text-align: right;\">", close: "</span>" },
            justify: { open: "<span style=\"text-decoration: justify;\">", close: "</span>" },
            strike: { open: "<span style=\"text-decoration: line-through;\">", close: "</span>" },
            code: { allowInnerTags: false, open: "<pre><code>", close: "</code></pre>" }
        };

        bbcodes.forEach(function (bbcode) {
            var tag = bbcode;
            var parseAction = tag;
            if (typeof bbcode === "object" && bbcode.alias) {
                tag = bbcode.name;
                parseAction = bbcode.alias;
            }
            if (tagActions[bbcode]) return bboxed.addTag(tag, tagActions[parseAction]);
            return bboxed.addTag(tag, { open: "<"+parseAction+">", close: "</"+parseAction+">" });
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
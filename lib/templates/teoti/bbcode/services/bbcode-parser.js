'use strict';

var BBCodeParser = require("bbcode-parser");
var BBTag = require('bbcode-parser/bbTag');

angular.module("teoti.bbcode").provider("BBCodeParser", [
    function () {
        var tags = {};
        /*var tagActions = {
            url: function () {

            }
        };*/

        var parser = new BBCodeParser(BBCodeParser.defaultTags());

        this.$get = [
            function () {
                return {
                    parse: function (bbcode) {
                        return parser.parseString(bbcode);
                    }
                };
            }
        ];
    }
]);
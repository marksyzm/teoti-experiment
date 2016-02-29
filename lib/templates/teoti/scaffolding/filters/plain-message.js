'use strict';

var angular = require("angular")

angular.module("teoti.scaffolding").filter('plainMessage', [
    'StringUtils', 'linkify',
    function (StringUtils, linkify) {
        return function (text, limit) {
            limit = limit || 2;
            text = StringUtils.xss(text);
            text = StringUtils.nl2br(text, limit);
            text = linkify.parse(text);
            text = StringUtils.trust(text);
            return text;
        };
    }
]);
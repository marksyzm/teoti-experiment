'use strict';

var angular = require("angular")

angular.module("teoti.scaffolding").filter('plainMessage', [
    'StringUtils',
    function (StringUtils) {
        return function (text, limit) {
            limit = limit | 2;
            text = StringUtils.xss(text);
            text = StringUtils.nl2br(text, limit);
            text = StringUtils.trust(text);
            return text;
        };
    }
]);
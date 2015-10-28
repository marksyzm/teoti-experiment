'use strict';

var angular = require("angular")

angular.module("teoti.scaffolding").filter('toTrusted', [
    '$sce',
    function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }
]);
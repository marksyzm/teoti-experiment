"use strict";

var angular = require("angular");

angular.module("teoti.services").factory("Events", [
    function () {
        return {
            DOCUMENT_CLICK: "document-click"
        };
    }
]);
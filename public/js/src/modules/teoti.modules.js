"use strict";

var angular = require("angular");

var moduleName = "teoti.modules";

angular.module(moduleName, [
    require("./teoti.services"),
    require("./teoti.controllers"),
    require("./teoti.directives"),
    require("./teoti.config"),
    require("./teoti.run"),
    require("./teoti.filters")
]);

module.exports = moduleName;
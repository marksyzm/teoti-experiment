"use strict";

var angular = require("angular");

var moduleName = "teoti.modules";

angular.module(moduleName, [
    require("./teoti.services.js"),
    require("./teoti.constants.js"),
    require("./teoti.controllers.js"),
    require("./teoti.directives.js"),
    require("./teoti.config.js"),
    require("./teoti.run.js"),
    require("./teoti.filters.js")
]);

module.exports = moduleName;
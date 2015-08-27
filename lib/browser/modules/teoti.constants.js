"use strict";

var angular = require("angular");

var moduleName = "teoti.constants";

angular.module(moduleName, []);

require("../constants/utils");
require("../constants/settings");
require("../constants/events");
require("../constants/config");

module.exports = moduleName;
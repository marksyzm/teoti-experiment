"use strict";

var angular = require("angular");

var moduleName = "teoti.services";

angular.module(moduleName, []);

require("../services/group-resource");
require("../services/user-resource");

module.exports = moduleName;
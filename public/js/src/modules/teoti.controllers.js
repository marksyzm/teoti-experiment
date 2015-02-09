"use strict";

var angular = require("angular");

var moduleName = "teoti.controllers";

angular.module(moduleName, []);

require("../controllers/user");
require("../controllers/groups");
require("../controllers/group-edit");

module.exports = moduleName;
"use strict";

var angular = require("angular");

var moduleName = "teoti.services";

angular.module(moduleName, []);

require("../services/group-resource");
require("../services/user-resource");
require("../services/forum-resource");
require("../services/account-resource");
require("../services/threads-resource");

module.exports = moduleName;
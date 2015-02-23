"use strict";

var angular = require("angular");

var moduleName = "teoti.controllers";

angular.module(moduleName, []);

require("../controllers/user");
require("../controllers/groups");
require("../controllers/forums");
require("../controllers/group-edit");
require("../controllers/forum-edit");
require("../controllers/search");

module.exports = moduleName;
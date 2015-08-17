"use strict";

var angular = require("angular");

var moduleName = "teoti.directives";

angular.module(moduleName, []);

require("../directives/autocomplete");
require("../directives/focus-element");
require("../directives/html");
require("../directives/like-dislike");
require("../directives/threads");
require("../directives/thread");
require("../directives/users");
require("../directives/user");
require("../directives/media");

module.exports = moduleName;
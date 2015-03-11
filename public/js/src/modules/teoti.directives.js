"use strict";

var angular = require("angular");

var moduleName = "teoti.directives";

angular.module(moduleName, []);

require("../directives/autocomplete");
require("../directives/focus-element");
require("../directives/html");
require("../directives/like-dislike");

module.exports = moduleName;
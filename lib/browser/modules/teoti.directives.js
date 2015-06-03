"use strict";

var angular = require("angular");

var moduleName = "teoti.directives";

angular.module(moduleName, []);

require("../directives/autocomplete");
require("../directives/focus-element");
require("../directives/html");
require("../directives/like-dislike");
//require("../directives/a");
require("../directives/threads.jsx");

module.exports = moduleName;
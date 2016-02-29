"use strict";

var angular = require("angular");
module.exports = angular.module("teoti.bbcode", [
  require("angular-linkify")
]).name;

require("./filters/bbcode");
require("./services/bbcode-parser");
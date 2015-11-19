'use strict';

var angular = require("angular");
module.exports = angular.module("teoti.bbcode", []).name;

require("./filters/bbcode");
require("./services/bbcode-parser");
'use strict';

var angular = require("angular");

module.exports = angular.module("teoti.posts", []).name;

require("./directives/posts");
require("./directives/post-editor");
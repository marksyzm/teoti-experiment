'use strict';

var angular = require("angular");
var linkify = require("../linkify");

module.exports = angular.module("teoti.post", [
  'linkify'
]).name;

require("./directives/post");
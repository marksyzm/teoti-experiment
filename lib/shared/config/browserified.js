'use strict';

var _ = require("lodash");
var app = require("../../../config/app.json");
var base = require("../../../config/base.json");

module.exports = _.extend({}, app, base);